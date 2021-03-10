"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "src/data");
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer_1.default({ storage });
router.post("/upload", upload.single("csvFile"), (req, res) => {
    try {
        const message = req.file ? "Success!" : "Error";
        res.redirect("/update-data?message=" + message);
    }
    catch (err) {
        const message = "Error";
        res.send("/update-data?message=" + message);
    }
});
exports.default = router;
//# sourceMappingURL=upload.js.map