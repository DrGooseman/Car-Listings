import express from "express";

import { listings } from "../models/listings";
import { contacts } from "../models/contacts";

const router = express.Router();

router.get("/all", (req, res, next) => {
  res.status(200).json({
    listings,
    contacts,
  });
});

router.get("/listings", (req, res, next) => {
  res.status(200).json({
    listings,
  });
});

router.get("/contacts", (req, res, next) => {
  res.status(200).json({
    contacts,
  });
});

export default router;
