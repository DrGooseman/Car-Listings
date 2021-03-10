import csv from "csv-parser";
import fs from "fs";

interface Listing {
  id: number;
  make: string;
  price: number;
  mileage: number;
  sellerType: SellerType;
}

enum SellerType {
  Sealer = "dealer",
  Private = "private",
  Other = "other",
}

const fileName = "src/data/listings.csv";

let listings: Listing[] = [];

function importData() {
  const newListings: Listing[] = [];

  fs.createReadStream(fileName)
    .pipe(csv())
    .on("data", (row) => {
      const listing: Listing = {
        id: Number(row.id),
        make: row.make,
        price: Number(row.price),
        mileage: Number(row.mileage),
        sellerType: row.seller_type as SellerType,
      };
      newListings.push(listing);
    })
    .on("end", () => {
      listings = newListings;
    });
}

export { importData, listings, Listing };
