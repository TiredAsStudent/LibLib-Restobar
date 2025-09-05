import multer from "multer";
import path from "path";
import fs from "fs";

// Setup upload directory
const uploadDir = path.join(process.cwd(), "uploads", "menu");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// File type validation
const fileFilter = (_req, file, cb) => {
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif",
    "image/avif",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        "Only image files are allowed (png, jpg, jpeg, webp, gif, avif)"
      ),
      false
    );
  }

  cb(null, true);
};

// Storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),

  // Clean and unique file naming
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    cb(null, `${Date.now()}-${baseName}${ext}`); // e.g., 1735973810-chicken-burger.jpg
  },
});

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // max 5MB
  },
});

export default upload;
