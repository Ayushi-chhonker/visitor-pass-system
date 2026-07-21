import multer from "multer";
import path from "path";

/*
File Upload Utility
This utility is responsible for handling image uploads
using Multer.

It performs three main tasks:
1. Stores uploaded images inside the "uploads" folder.
2. Generates a unique filename for every uploaded image.
3. Accepts only image files.
*/

// Configure Storage
const storage = multer.diskStorage({
  // Store uploaded files inside the uploads folder
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },

  // Generate a unique filename to prevent duplicate names
  filename: (req, file, callback) => {
    /* Example:
      Original file: profile.jpg
      Saved file: 1752849238421.jpg */
    const uniqueFileName =
      `${Date.now()}${path.extname(file.originalname)}`;
    callback(null, uniqueFileName);
  }
});

// File Filter
const fileFilter = (req, file, callback) => {

  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    callback(null, true);
  } else {
    callback(
      new Error("Only image files are allowed."),
      false
    );
  }
};

// Create Upload Middleware
const upload = multer({
  storage,
  fileFilter
});
export default upload;