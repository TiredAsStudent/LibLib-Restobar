import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  listItems,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/adminMenuController.js";

const router = express.Router();

// READ - List all menu items (with filters & pagination)
router.get("/", listItems);

// CREATE - Add a new menu item (supports image upload)
router.post("/", upload.single("image"), createItem);

// UPDATE - Edit existing menu item by ID (replace image if uploaded)
router.put("/:id", upload.single("image"), updateItem);

// DELETE - Remove a menu item by ID (also deletes image file)
router.delete("/:id", deleteItem);

export default router;
