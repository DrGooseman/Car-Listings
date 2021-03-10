import express, { Request, Response } from "express";
import multer from "multer";

import { importData as importListingsData } from "../models/listings";
import { importData as importContactsData } from "../models/contacts";

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
  async (req: MulterRequest, res: Response) => {
    try {
      const message = req.file ? "Success!" : "Error";

      if (req.file.originalname === "listings.csv") importListingsData();
      else if (req.file.originalname === "contacts.csv") importContactsData();

      res.redirect("/update-data?message=" + message);
    } catch (err) {
      const message = "Error";
      res.redirect("/update-data?message=" + message);
    }
  }
);

export default router;
