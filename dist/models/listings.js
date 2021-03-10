"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listings = exports.importData = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
var SellerType;
(function (SellerType) {
    SellerType["Sealer"] = "dealer";
    SellerType["Private"] = "private";
    SellerType["Other"] = "other";
})(SellerType || (SellerType = {}));
const fileName = "src/data/listings.csv";
let listings = [];
exports.listings = listings;
function importData() {
    const newListings = [];
    fs_1.default.createReadStream(fileName)
        .pipe(csv_parser_1.default())
        .on("data", (row) => {
        const listing = {
            id: Number(row.id),
            make: row.make,
            price: Number(row.price),
            mileage: Number(row.mileage),
            sellerType: row.seller_type,
        };
        newListings.push(listing);
    })
        .on("end", () => {
        exports.listings = listings = newListings;
    });
}
exports.importData = importData;
//# sourceMappingURL=listings.js.map