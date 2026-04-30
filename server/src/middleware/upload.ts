import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Local storage stub for file uploads (S3/Cloudinary alternative)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Check both query and body (body might not be populated yet for multipart)
    const folder = (req.query.folder as string) || req.body.folder || '';
    const uploadPath = path.join(__dirname, '../../uploads', folder);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, path.join('uploads', folder));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const filetypes = /jpg|jpeg|png|pdf|svg|webp|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images and PDFs only!'));
  }
}

export const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
