import multer from "multer";
import path from "path";

export default class PersistStorage {
  destination(req, file, cb) {
    cb(null, "public/");
  }

  imageFilename(req, file, cb) {
    cb(null, "/images/product/" + Date.now() + path.extname(file.originalname));
  }

  createImageStorage = () => {
    const storage = multer.diskStorage({
      destination: this.destination,
      filename: this.imageFilename,
    });

    return storage;
  };

  uploadSingleImage = () => {
    const storage = this.createImageStorage();
    const upload = multer({ storage });

    return upload.single("image");
  };
}
