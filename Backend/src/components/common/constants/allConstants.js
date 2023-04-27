export const COLLECTION = {
  drivers: 'drivers',
  cars: 'cars',
  k500Graph: 'k500_graph_data',
  priceEstimations: 'price_estimations',
  auctions: 'auction',
  carsForSale: 'dealer_cars',
  carsFromDealers: 'dealer_cars',
  specificCars: 'barchetta',
  dealers: 'dealers',
  clubs: 'clubs',
  collectors: 'collector_raw',
  news: 'news',
  socialMedia: 'social_media',
  circuits: 'racingcircuits',
  events: 'event',
  eventTeamDrivers: 'event_team_drivers',
  circuitEvents: 'circuit_events',
  eventCalendar: 'event_calender',
  eventDetails: 'event_details',
};

export const ASSET_CLASS_MAPPING = {
  Cars: {
    collection: COLLECTION.cars,
    subAsset: ['Antique', 'Classic', 'Latest'],
  },
  'Cars Models': {
    collection: COLLECTION.cars,
    subAsset: ['Antique', 'Classic', 'Latest'],
  },
  'Auction Data': {
    collection: COLLECTION.auctions,
    subAsset: ['All'],
  },
  Drivers: {
    collection: COLLECTION.drivers,
    subAsset: ['All'],
  },
  News: {
    collection: 'news',
    subAsset: ['All'],
  },
  Circuits: {
    collection: COLLECTION.circuits,
    subAsset: ['All'],
  },
  'Specific Cars': {
    collection: COLLECTION.specificCars,
    subAsset: ['All'],
  },
  Dealers: {
    collection: COLLECTION.dealers,
    subAsset: ['All'],
  },
  'Cars For Sale': {
    collection: COLLECTION.carsForSale,
    subAsset: ['All', 'For Sale', 'Already Sold'],
  },
  'Cars From Dealers': {
    collection: COLLECTION.carsForSale,
    subAsset: ['All', 'For Sale', 'Already Sold'],
  },
  Clubs: {
    collection: COLLECTION.clubs,
    subAsset: ['All'],
  },
};
