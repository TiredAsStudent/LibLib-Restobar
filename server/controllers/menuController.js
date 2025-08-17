import MenuItem from "../models/MenuItem.js";
import { getIO } from "../config/socket.js";
import fs from "fs";
import { toAbsUploadPath } from "../utils/file.js";
import { normalizeMenuPayload } from "../utils/payload.js";

export const createItem = async (req, res, next) => {
  try {
    const payload = normalizeMenuPayload(req.body);
    payload.category ??= "Uncategorized";
    payload.availability ??= true;

    if (req.file) payload.image = { url: `/uploads/menu/${req.file.filename}` };

    const item = await MenuItem.create(payload);

    getIO()
      ?.to(`store:${req.body.storeId ?? "default"}:menu`)
      .emit("menu:item_created", { item });

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// READ
export const listItems = async (req, res, next) => {
  try {
    const {
      search,
      category,
      availability,
      minPrice,
      maxPrice,
      page = 1,
      limit = 20,
      sort,
    } = req.query;
    const q = {};

    if (search) q.name = { $regex: search, $options: "i" };
    if (category) q.category = category;
    if (availability !== undefined)
      q.availability = availability === "true" || availability === "1";

    if (minPrice !== undefined || maxPrice !== undefined) {
      q.basePrice = {};
      if (minPrice !== undefined) {
        const min = Number(minPrice);
        if (!Number.isNaN(min)) q.basePrice.$gte = min;
      }
      if (maxPrice !== undefined) {
        const max = Number(maxPrice);
        if (!Number.isNaN(max)) q.basePrice.$lte = max;
      }
      if (Object.keys(q.basePrice).length === 0) delete q.basePrice;
    }

    const pageNum = Math.max(1, Number(page));
    const perPage = Math.max(1, Math.min(100, Number(limit)));

    let sortObj = { createdAt: -1 };
    if (sort) {
      const [field, dir] = String(sort).split(":");
      if (field) sortObj = { [field]: dir === "asc" ? 1 : -1 };
    }

    const total = await MenuItem.countDocuments(q);
    const totalPages = Math.max(1, Math.ceil(total / perPage));

    const items = await MenuItem.find(q)
      .sort(sortObj)
      .skip((pageNum - 1) * perPage)
      .limit(perPage)
      .lean();

    res.json({ items, page: pageNum, pageSize: perPage, total, totalPages });
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const payload = normalizeMenuPayload(req.body);

    if (req.file) {
      if (item.image?.url) {
        const oldAbs = toAbsUploadPath(item.image.url);
        if (fs.existsSync(oldAbs)) fs.unlinkSync(oldAbs);
      }
      payload.image = { url: `/uploads/menu/${req.file.filename}` };
    }

    const updated = await MenuItem.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });

    getIO()
      ?.to(`store:${req.body.storeId ?? "default"}:menu`)
      .emit("menu:item_updated", { item: updated });

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.image?.url) {
      const abs = toAbsUploadPath(item.image.url);
      if (fs.existsSync(abs)) fs.unlinkSync(abs);
    }

    await item.deleteOne();

    const storeId = req.body?.storeId ?? req.query?.storeId ?? "default";
    getIO()
      ?.to(`store:${storeId}:menu`)
      .emit("menu:item_deleted", { itemId: req.params.id });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
