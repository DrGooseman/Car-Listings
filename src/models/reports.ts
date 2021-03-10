import { listings, Listing } from "./listings";
import { contacts, Contact } from "./contacts";

interface Report {
  title: string;
  data: string[][];
}

function getReports(): Report[] {
  const reports: Report[] = [];

  reports.push(getAverageListingPricePerSellerType());
  reports.push(getPercentualDistributionByMake());
  reports.push(getAveragePriceOfMostContactedListings());
  reports.push(getTop5MostContactedListingsPerMonth());

  return reports;
}

function getAverageListingPricePerSellerType(): Report {
  const title: string = "Average Listing Price Per Seller Type";
  const data: string[][] = [];
  data.push(["Seller Type", "Average in Euro"]);

  const totalPricesMap = new Map<string, number>();
  const unitsSoldMap = new Map<string, number>();

  for (const listing of listings) {
    const sellerTypeString = listing.sellerType as string;

    const previousTotalPrice = totalPricesMap.get(sellerTypeString) || 0;
    totalPricesMap.set(sellerTypeString, previousTotalPrice + listing.price);

    const previousUnitsSold = unitsSoldMap.get(sellerTypeString) || 0;
    unitsSoldMap.set(sellerTypeString, previousUnitsSold + 1);
  }

  totalPricesMap.forEach((totalPrice: number, key: string) => {
    const unitsSold: number = unitsSoldMap.get(key);
    const averagePrice: number = Math.round(totalPrice / unitsSold);
    const averagePriceString: string = `€ ${averagePrice},-`;

    data.push([key, averagePriceString]);
  });

  const report: Report = {
    title,
    data,
  };
  return report;
}

function getPercentualDistributionByMake(): Report {
  const title: string = "Percentual Distribution of Available Cars by Make";
  const data: string[][] = [];
  data.push(["Make", "Distribution"]);

  const makeCountMap = new Map<string, number>();
  let totalCount: number = 0;

  for (const listing of listings) {
    const previousMakeCount = makeCountMap.get(listing.make) || 0;
    makeCountMap.set(listing.make, previousMakeCount + 1);

    totalCount++;
  }

  const makeCountMapSorted = new Map<string, number>(
    [...makeCountMap.entries()].sort((a, b) => b[1] - a[1])
  );

  makeCountMapSorted.forEach((makeCount: number, key: string) => {
    const makeCountPercentage: number = Math.round(
      (makeCount / totalCount) * 100
    );
    const makeCountPercentageString: string = makeCountPercentage + "%";

    data.push([key, makeCountPercentageString]);
  });

  const report: Report = {
    title,
    data,
  };
  return report;
}

function getAveragePriceOfMostContactedListings(): Report {
  const title: string = "Average Price of the 30% most contacted listings";
  const data: string[][] = [];
  data.push(["Average price"]);

  const timesContactedMap = new Map<number, number>();

  for (const contact of contacts) {
    const previousTimesContacted =
      timesContactedMap.get(contact.listing_id) || 0;
    timesContactedMap.set(contact.listing_id, previousTimesContacted + 1);
  }

  const timesContactedMapSorted = new Map<number, number>(
    [...timesContactedMap.entries()].sort((a, b) => b[1] - a[1])
  );

  const top30Count = timesContactedMapSorted.size * 0.3;

  let top30PriceTotal = 0;
  let counter = 0;
  // There may be a better way to do this rather than use a counter, but I am short on time
  for (const key of timesContactedMapSorted.keys()) {
    top30PriceTotal += listings.find((l: Listing) => l.id === key).price;
    counter++;
    if (counter >= top30Count) break;
  }

  const averagePrice = Math.round(top30PriceTotal / top30Count);
  data.push([averagePrice.toString()]);

  const report: Report = {
    title,
    data,
  };
  return report;
}

function getTop5MostContactedListingsPerMonth(): Report {
  const title: string = "Top 5 Most Contacted Listings Per Month";
  const data: string[][] = [];
  data.push([
    "Ranking",
    "Listing Id",
    "Make",
    "Selling Price",
    "Mileage",
    "Total Amount of Contacts",
  ]);

  const monthAndYearMap = new Map<number, Contact[]>();

  for (const contact of contacts) {
    const date: Date = contact.contact_date;
    const month: number = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const monthAndYearTime: number = new Date(year, month).getTime();

    const dateContacts: Contact[] = monthAndYearMap.get(monthAndYearTime) || [];
    dateContacts.push(contact);
    monthAndYearMap.set(monthAndYearTime, dateContacts);
  }

  const monthAndYearMapSorted = new Map<number, Contact[]>(
    [...monthAndYearMap.entries()].sort((a, b) => a[0] - b[0])
  );

  // generate table for each month
  monthAndYearMapSorted.forEach(
    (contactsInMonth: Contact[], timeKey: number) => {
      const date = new Date(timeKey);
      const month: string = (date.getUTCMonth() + 1).toString();
      const year: string = date.getUTCFullYear().toString();
      data.push([`Date: ${month}.${year}`]);
      const timesContactedMap = new Map<number, number>();

      for (const contact of contactsInMonth) {
        const previousTimesContacted =
          timesContactedMap.get(contact.listing_id) || 0;
        timesContactedMap.set(contact.listing_id, previousTimesContacted + 1);
      }

      // sort the contacts by times contacted
      const timesContactedMapSorted = new Map<number, number>(
        [...timesContactedMap.entries()].sort((a, b) => b[1] - a[1])
      );

      let counter = 0;
      // There may be a better way to do this rather than use a counter, but I am short on time
      for (const key of timesContactedMapSorted.keys()) {
        counter++;
        const listing: Listing = listings.find((l: Listing) => l.id === key);
        data.push([
          counter.toString(),
          listing.id.toString(),
          listing.make,
          `€ ${listing.price},-`,
          listing.mileage + " KM",
          timesContactedMapSorted.get(key).toString(),
        ]);
        if (counter >= 5) break;
      }
    }
  );

  const report: Report = {
    title,
    data,
  };
  return report;
}

export { Report, getReports };
