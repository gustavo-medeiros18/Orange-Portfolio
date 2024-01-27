import multer from "multer";
import fs from "fs";

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const mimetype = file.mimetype.split("/")[1];
    const uploadedFileName = `${file.fieldname}-${Date.now()}.${mimetype}`;

    cb(null, uploadedFileName);
  },
});

const upload = multer({ storage: storage });
export const imageUploader = upload.single("image");
