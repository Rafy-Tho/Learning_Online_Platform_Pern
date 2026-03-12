import fs from "fs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { FILE_SIZE_LIMIT } from "../constants/constants.js";

// 1. Correctly handle paths in ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadFolder = path.join(__dirname, "../../uploads");

// 3. Ensure the folder exists
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    // Clean filename: timestamp + original name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: FILE_SIZE_LIMIT }, // 5MB limit
});
