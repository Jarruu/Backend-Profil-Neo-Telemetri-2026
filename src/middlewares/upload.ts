import multer from "multer";
import { cloudinaryStorage } from "../lib/cloudinary.js";
import path from "path";

export const upload = multer({ 
  storage: cloudinaryStorage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|mp4|mov|avi/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only images (jpeg, jpg, png, webp) and videos (mp4, mov, avi) are allowed"));
  }
});
