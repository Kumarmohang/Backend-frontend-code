import Auction from '../../auction/model';
import Circuits from '../../circuit/model';
import { Drivers, EventTeamDrivers } from '../../driver/model';
import Dealers, { CarsForSell } from '../../dealer/model';
import Clubs from '../../club/model';
import Cars from '../../car/model';
import SpecificCar from '../../specificCar/model';
import collector from '../../collector/model';
import { News, SocialMedia } from '../../newsSocialMedia/model';
import CarPrice from '../../price/model';
import CarYear from '../../advanceSearch/model';
import SimilarCars from '../../similarCars/model';
import CarAnalytics from '../../carAnalytics/model';

export const ASSET_CLASS_MODEL_MAPPING = {
  Cars: {
    subAsset: ['Antique', 'Classic', 'Latest'],
    model: Cars,
  },
  'Cars Models': {
    subAsset: ['Antique', 'Classic', 'Latest'],
    model: Cars,
  },
  'Auction Data': {
    subAsset: ['All'],
    model: Auction,
  },
  Drivers: {
    subAsset: ['All'],
    model: Drivers,
  },
  News: {
    collection: 'news',
    subAsset: ['All'],
    model: News,
  },
  Circuits: {
    subAsset: ['All'],
    model: Circuits,
  },
  'Specific Cars': {
    subAsset: ['All'],
    model: SpecificCar,
  },
  Dealers: {
    subAsset: ['All'],
    model: Dealers,
  },
  'Cars For Sale': {
    subAsset: ['All', 'For Sale', 'Already Sold'],
    model: CarsForSell,
  },
  'Cars From Dealers': {
    subAsset: ['All', 'For Sale', 'Already Sold'],
    model: CarsForSell,
  },
  Clubs: {
    subAsset: ['All'],
    model: Clubs,
  },
  SimilarCars: {
    subAsset: ['All'],
    model: SimilarCars,
  },
};

export const COLLECTION_MODEL_MAP = {
  drivers: Drivers,
  cars: Cars,
  car_analytics: CarAnalytics,
  car_year_wise: CarYear,
  k500Graph: CarPrice,
  priceEstimations: 'price_estimations',
  auctions: Auction,
  carsForSale: CarsForSell,
  specificCars: SpecificCar,
  dealers: Dealers,
  clubs: Clubs,
  collectors: collector,
  news: News,
  socialMedia: SocialMedia,
  circuits: Circuits,
  events: 'event',
  eventTeamDrivers: EventTeamDrivers,
  circuitEvents: 'circuit_events',
  eventCalendar: 'event_calender',
  eventDetails: 'event_details',
  carsFromDealers: CarsForSell,
  similarCars: SimilarCars,
};
