"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const listings_1 = __importDefault(require("./routes/listings"));
const upload_1 = __importDefault(require("./routes/upload"));
const api_1 = __importDefault(require("./routes/api"));
const listings_2 = require("./models/listings");
const contacts_1 = require("./models/contacts");
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.SERVER_PORT || 5000;
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express_1.default.static("src/public"));
app.use("/api", api_1.default);
app.use(listings_1.default);
app.use(upload_1.default);
app.listen(port, () => {
    listings_2.importData();
    contacts_1.importData();
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map