import express, { Request, Response } from "express";
import multer from "multer";

const router = express.Router();

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "src/data");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("csvFile"),
  (req: MulterRequest, res: Response) => {
    try {
      const message = req.file ? "Success!" : "Error";
      res.redirect("/update-data?message=" + message);
    } catch (err) {
      const message = "Error";
      res.send("/update-data?message=" + message);
    }
  }
);

export default router;
