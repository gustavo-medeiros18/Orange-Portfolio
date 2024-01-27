import multer from "multer";
import fs from "fs";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { firebaseConfig } from "../config/firebase.config";

const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadDir = "./uploads";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

    cb(null, uploadDir);
  },
  filename: async function uploadToFirebase(_req, file, cb) {
    const mimetype = file.mimetype.split("/")[1];
    const uploadedFileName = `${file.fieldname}-${Date.now()}.${mimetype}`;

    cb(null, uploadedFileName);

    const firebaseApp = initializeApp(firebaseConfig);

    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, uploadedFileName);

    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("Uploaded a blob or file!", downloadURL);

    cb(null, downloadURL);
  },
});

const upload = multer({ storage: storage });
export const imageUploader = upload.single("image");
