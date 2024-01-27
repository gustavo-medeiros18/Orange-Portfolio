import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { firebaseConfig } from "../config/firebase.config";

export const uploadFile = async (file: Express.Multer.File): Promise<string> => {
  const firebaseApp = initializeApp(firebaseConfig);

  const storage = getStorage(firebaseApp);
  const storageRef = ref(storage, `image-${Date.now()}`);

  const metadata = {
    contentType: file.mimetype,
  };

  const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
};
