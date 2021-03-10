"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const listings_1 = require("../models/listings");
const contacts_1 = require("../models/contacts");
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
router.post("/upload", upload.single("csvFile"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = req.file ? "Success!" : "Error";
        if (req.file.originalname === "listings.csv")
            listings_1.importData();
        else if (req.file.originalname === "contacts.csv")
            contacts_1.importData();
        res.redirect("/update-data?message=" + message);
    }
    catch (err) {
        const message = "Error";
        res.redirect("/update-data?message=" + message);
    }
}));
exports.default = router;
//# sourceMappingURL=upload.js.map