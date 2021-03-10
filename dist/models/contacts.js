"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contacts = exports.importData = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const fileName = "src/data/contacts.csv";
let contacts = [];
exports.contacts = contacts;
function importData() {
    const newContacts = [];
    fs_1.default.createReadStream(fileName)
        .pipe(csv_parser_1.default())
        .on("data", (row) => {
        const time = Number(row.contact_date);
        const contact = {
            listing_id: Number(row.listing_id),
            contact_date: new Date(time),
        };
        newContacts.push(contact);
    })
        .on("end", () => {
        exports.contacts = contacts = newContacts;
    });
}
exports.importData = importData;
//# sourceMappingURL=contacts.js.map