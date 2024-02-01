import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const multerMiddlewareProject = upload.single("imgUrl");
export const multerMiddlewareUser = upload.single("iconUrl");