import express from "express";

import { getReports, Report } from "../models/reports";

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    pageTitle: "Home",
    path: "/",
  });
});

router.get("/view-reports", (req, res, next) => {
  let reports: Report[];

  reports = getReports();

  res.render("view-reports", {
    pageTitle: "View Reports",
    path: "/view-reports",
    reports,
  });
});

router.get("/update-data", (req, res, next) => {
  res.render("update-data", {
    pageTitle: "Update Data",
    path: "/update-data",
    message: req.query.message,
  });
});

export default router;
