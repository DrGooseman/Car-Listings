import express from "express";
import path from "path";
import dotenv from "dotenv";
import multer from "multer";

import listingsRoutes from "./routes/listings";
import uploadRoutes from "./routes/upload";
import apiRoutes from "./routes/api";
import { importData as importListingsData } from "./models/listings";
import { importData as importContactsData } from "./models/contacts";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("src/public"));

app.use("/api", apiRoutes);
app.use(listingsRoutes);
app.use(uploadRoutes);

app.listen(port, () => {
  importListingsData();
  importContactsData();
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
