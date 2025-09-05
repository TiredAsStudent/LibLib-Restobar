import MenuItem from "../models/MenuItem.js";
import fs from "fs";
import { toAbsUploadPath } from "../utils/file.js";
import { normalizeMenuPayload } from "../utils/payload.js";

// CREATE
export const createItem = async (req, res, next) => {
  try {
    const payload = normalizeMenuPayload(req.body);

    // Defaults
    payload.category ??= "Uncategorized";
    payload.availability ??= true;

    // If an image is uploaded, store its path
    if (req.file) {
      payload.image = { url: `/uploads/menu/${req.file.filename}` };
    }

    const item = await MenuItem.create(payload);

    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// READ (list with filters + pagination)
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

    // Search by name
    if (search) q.name = { $regex: search, $options: "i" };

    if (category) q.category = category;
    if (availability !== undefined) {
      q.availability = availability === "true" || availability === "1";
    }

    // Price range filtering
    if (minPrice !== undefined || maxPrice !== undefined) {
      q.basePrice = {};
      if (minPrice !== undefined && !Number.isNaN(Number(minPrice))) {
        q.basePrice.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && !Number.isNaN(Number(maxPrice))) {
        q.basePrice.$lte = Number(maxPrice);
      }
      if (Object.keys(q.basePrice).length === 0) delete q.basePrice;
    }

    // Pagination
    const pageNum = Math.max(1, Number(page));
    const perPage = Math.max(1, Math.min(100, Number(limit)));

    // Sorting
    let sortObj = { createdAt: -1 }; // default: newest first
    if (sort) {
      const [field, dir] = String(sort).split(":");
      if (field) sortObj = { [field]: dir === "asc" ? 1 : -1 };
    }

    // Query DB
    const total = await MenuItem.countDocuments(q);
    const totalPages = Math.max(1, Math.ceil(total / perPage));

    const items = await MenuItem.find(q)
      .sort(sortObj)
      .skip((pageNum - 1) * perPage)
      .limit(perPage)
      .lean();

    res.json({
      items,
      page: pageNum,
      pageSize: perPage,
      total,
      totalPages,
    });
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

    // If new image uploaded, delete old one
    if (req.file) {
      if (item.image?.url) {
        const oldAbsPath = toAbsUploadPath(item.image.url);
        if (fs.existsSync(oldAbsPath)) fs.unlinkSync(oldAbsPath);
      }
      payload.image = { url: `/uploads/menu/${req.file.filename}` };
    }

    const updated = await MenuItem.findByIdAndUpdate(req.params.id, payload, {
      new: true, // return updated doc
    });

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

    // Delete associated image if exists
    if (item.image?.url) {
      const absPath = toAbsUploadPath(item.image.url);
      if (fs.existsSync(absPath)) fs.unlinkSync(absPath);
    }

    await item.deleteOne();

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
