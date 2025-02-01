import multer from 'multer';
import path from 'path';

// Set storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Ensure unique filenames
  },
});

// File filter to allow only JSON files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/json') {
    cb(null, true);
  } else {
    cb(new Error('Only JSON files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
