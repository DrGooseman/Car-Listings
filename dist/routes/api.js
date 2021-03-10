"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listings_1 = require("../models/listings");
const contacts_1 = require("../models/contacts");
const router = express_1.default.Router();
router.get("/all", (req, res, next) => {
    res.status(200).json({
        listings: listings_1.listings,
        contacts: contacts_1.contacts,
    });
});
router.get("/listings", (req, res, next) => {
    res.status(200).json({
        listings: listings_1.listings,
    });
});
router.get("/contacts", (req, res, next) => {
    res.status(200).json({
        contacts: contacts_1.contacts,
    });
});
exports.default = router;
//# sourceMappingURL=api.js.map