"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reports_1 = require("../models/reports");
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    res.render("index", {
        pageTitle: "Home",
        path: "/",
    });
});
router.get("/view-reports", (req, res, next) => {
    let reports;
    reports = reports_1.getReports();
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
exports.default = router;
//# sourceMappingURL=listings.js.map