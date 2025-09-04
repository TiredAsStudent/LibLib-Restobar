import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  listItems,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/adminMenuController.js";

const router = express.Router();

router.get("/", listItems);
router.post("/", upload.single("image"), createItem);
router.put("/:id", upload.single("image"), updateItem);
router.delete("/:id", deleteItem);

export default router;
