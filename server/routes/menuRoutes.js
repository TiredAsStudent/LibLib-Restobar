import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import * as ctrl from "../controllers/menuController.js";

const router = express.Router();

router.get("/", ctrl.listItems);
router.post("/", upload.single("image"), ctrl.createItem);
router.put("/:id", upload.single("image"), ctrl.updateItem);
router.delete("/:id", ctrl.deleteItem);

export default router;
