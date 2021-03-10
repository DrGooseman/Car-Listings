import csv from "csv-parser";
import fs from "fs";

interface Contact {
  listing_id: number;
  contact_date: Date;
}

const fileName = "src/data/contacts.csv";

let contacts: Contact[] = [];

function importData() {
  const newContacts: Contact[] = [];

  fs.createReadStream(fileName)
    .pipe(csv())
    .on("data", (row) => {
      const time = Number(row.contact_date);
      const contact: Contact = {
        listing_id: Number(row.listing_id),
        contact_date: new Date(time),
      };
      newContacts.push(contact);
    })
    .on("end", () => {
      contacts = newContacts;
    });
}

export { importData, contacts, Contact };
