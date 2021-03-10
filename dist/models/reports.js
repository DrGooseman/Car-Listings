"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReports = void 0;
const listings_1 = require("./listings");
const contacts_1 = require("./contacts");
function getReports() {
    const reports = [];
    reports.push(getAverageListingPricePerSellerType());
    reports.push(getPercentualDistributionByMake());
    reports.push(getAveragePriceOfMostContactedListings());
    reports.push(getTop5MostContactedListingsPerMonth());
    return reports;
}
exports.getReports = getReports;
function getAverageListingPricePerSellerType() {
    const title = "Average Listing Price Per Seller Type";
    const data = [];
    data.push(["Seller Type", "Average in Euro"]);
    const totalPricesMap = new Map();
    const unitsSoldMap = new Map();
    for (const listing of listings_1.listings) {
        const sellerTypeString = listing.sellerType;
        const previousTotalPrice = totalPricesMap.get(sellerTypeString) || 0;
        totalPricesMap.set(sellerTypeString, previousTotalPrice + listing.price);
        const previousUnitsSold = unitsSoldMap.get(sellerTypeString) || 0;
        unitsSoldMap.set(sellerTypeString, previousUnitsSold + 1);
    }
    totalPricesMap.forEach((totalPrice, key) => {
        const unitsSold = unitsSoldMap.get(key);
        const averagePrice = Math.round(totalPrice / unitsSold);
        const averagePriceString = `€ ${averagePrice},-`;
        data.push([key, averagePriceString]);
    });
    const report = {
        title,
        data,
    };
    return report;
}
function getPercentualDistributionByMake() {
    const title = "Percentual Distribution of Available Cars by Make";
    const data = [];
    data.push(["Make", "Distribution"]);
    const makeCountMap = new Map();
    let totalCount = 0;
    for (const listing of listings_1.listings) {
        const previousMakeCount = makeCountMap.get(listing.make) || 0;
        makeCountMap.set(listing.make, previousMakeCount + 1);
        totalCount++;
    }
    const makeCountMapSorted = new Map([...makeCountMap.entries()].sort((a, b) => b[1] - a[1]));
    makeCountMapSorted.forEach((makeCount, key) => {
        const makeCountPercentage = Math.round((makeCount / totalCount) * 100);
        const makeCountPercentageString = makeCountPercentage + "%";
        data.push([key, makeCountPercentageString]);
    });
    const report = {
        title,
        data,
    };
    return report;
}
function getAveragePriceOfMostContactedListings() {
    const title = "Average Price of the 30% most contacted listings";
    const data = [];
    data.push(["Average price"]);
    const timesContactedMap = new Map();
    for (const contact of contacts_1.contacts) {
        const previousTimesContacted = timesContactedMap.get(contact.listing_id) || 0;
        timesContactedMap.set(contact.listing_id, previousTimesContacted + 1);
    }
    const timesContactedMapSorted = new Map([...timesContactedMap.entries()].sort((a, b) => b[1] - a[1]));
    const top30Count = timesContactedMapSorted.size * 0.3;
    let top30PriceTotal = 0;
    let counter = 0;
    // There may be a better way to do this rather than use a counter, but I am short on time
    for (const key of timesContactedMapSorted.keys()) {
        top30PriceTotal += listings_1.listings.find((l) => l.id === key).price;
        counter++;
        if (counter >= top30Count)
            break;
    }
    const averagePrice = Math.round(top30PriceTotal / top30Count);
    data.push([averagePrice.toString()]);
    const report = {
        title,
        data,
    };
    return report;
}
function getTop5MostContactedListingsPerMonth() {
    const title = "Top 5 Most Contacted Listings Per Month";
    const data = [];
    data.push([
        "Ranking",
        "Listing Id",
        "Make",
        "Selling Price",
        "Mileage",
        "Total Amount of Contacts",
    ]);
    const monthAndYearMap = new Map();
    for (const contact of contacts_1.contacts) {
        const date = contact.contact_date;
        const month = date.getUTCMonth();
        const year = date.getUTCFullYear();
        const monthAndYearTime = new Date(year, month).getTime();
        const dateContacts = monthAndYearMap.get(monthAndYearTime) || [];
        dateContacts.push(contact);
        monthAndYearMap.set(monthAndYearTime, dateContacts);
    }
    const monthAndYearMapSorted = new Map([...monthAndYearMap.entries()].sort((a, b) => a[0] - b[0]));
    // generate table for each month
    monthAndYearMapSorted.forEach((contactsInMonth, timeKey) => {
        const date = new Date(timeKey);
        const month = (date.getUTCMonth() + 1).toString();
        const year = date.getUTCFullYear().toString();
        data.push([`Date: ${month}.${year}`]);
        const timesContactedMap = new Map();
        for (const contact of contactsInMonth) {
            const previousTimesContacted = timesContactedMap.get(contact.listing_id) || 0;
            timesContactedMap.set(contact.listing_id, previousTimesContacted + 1);
        }
        // sort the contacts by times contacted
        const timesContactedMapSorted = new Map([...timesContactedMap.entries()].sort((a, b) => b[1] - a[1]));
        let counter = 0;
        // There may be a better way to do this rather than use a counter, but I am short on time
        for (const key of timesContactedMapSorted.keys()) {
            counter++;
            const listing = listings_1.listings.find((l) => l.id === key);
            data.push([
                counter.toString(),
                listing.id.toString(),
                listing.make,
                `€ ${listing.price},-`,
                listing.mileage + " KM",
                timesContactedMapSorted.get(key).toString(),
            ]);
            if (counter >= 5)
                break;
        }
    });
    const report = {
        title,
        data,
    };
    return report;
}
//# sourceMappingURL=reports.js.map