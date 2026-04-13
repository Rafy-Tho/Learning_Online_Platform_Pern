import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { FILE_SIZE_LIMIT } from "../constants/constants.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadFolder = path.join(__dirname, "../../uploads");

// Ensure folder exists
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Validate file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpg, png, webp)"));
  }
};

// Safe filename generator
const filename = (file) => {
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  return `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, filename(file));
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: FILE_SIZE_LIMIT },
  fileFilter,
});
