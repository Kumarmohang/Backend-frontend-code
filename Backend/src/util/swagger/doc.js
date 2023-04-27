import {
  getCircuitDetail,
  getCircuits,
} from '../../components/circuit/circuitDoc';
import { getClubDetail, getClubs } from '../../components/club/clubDoc';
import {
  getCollectorDetail,
  getCollectors,
} from '../../components/collector/collectorDoc';
import { getDealers } from '../../components/dealer/dealerDoc';

import { getDriverDetail, getDrivers } from '../../components/driver/driverDoc';
import { getCarDetailByVin } from '../../components/vin/vinDoc';
import { userLogin } from '../../components/user/userDoc';
import {
  circuitDefintion,
  clubDefinition,
  collectorDefiniton,
  driverDefinition,
  resultData,
  dealersResult,
  dealersPageResponse,
  getAssetdefinition,
  getListDefinition,
  error404Schema,
  login,
  loginResponse,
  carDefinition,
  carList,
  valuation,
  valuationResponse,
  suggestionList,
  suggestionCreate,
  suggestionUpdate,
  suggestionCreateResponse,
  suggestionUpdateResponse,
} from './apiResponsedefintion';
import {
  getAsset,
  getList,
  getSearchResult,
} from '../../components/home/homeDocs';
import CONFIG from '../../config';
import { getCarDetail, getAllCars } from '../../components/car/carDocs';
import { carValuation } from '../../components/valuation/valuationDocs';
import {
  getAllSuggestions,
  suggestionsCreateRequest,
  suggestionsUpdateRequest,
} from '../../components/suggestions/suggestionsDoc';

const apiDocumentation = {
  openapi: '3.0.1',
  info: {
    version: CONFIG.PROJECT_VERSION,
    title: CONFIG.PROJECT_NAME,
    description: `${CONFIG.PROJECT_NAME} API documentation`,
  },
  servers: [
    {
      url: CONFIG.HOST_ADDRESS,
      description: 'Driven Api HOST',
    },
  ],
  tags: [
    {
      name: 'login',
    },
    {
      name: 'home',
    },
    {
      name: 'car',
    },
    {
      name: 'vin',
    },
    {
      name: 'valuation',
    },
    {
      name: 'clubs',
    },
    {
      name: 'circuits',
    },
    {
      name: 'collector',
    },
    {
      name: 'driver',
    },
    {
      name: 'dealer',
    },
    {
      name: 'Suggestions',
    },
  ],
  paths: {
    '/search': {
      get: getSearchResult,
    },
    '/details': {
      get: getCarDetail,
    },
    '/users/login': {
      post: userLogin,
    },
    '/drivers': {
      get: getDrivers,
    },
    '/drivers/details': {
      get: getDriverDetail,
    },
    '/vin': {
      get: getCarDetailByVin,
    },
    '/clubs': {
      get: getClubs,
    },
    '/clubs/details': {
      get: getClubDetail,
    },
    '/circuits': {
      get: getCircuits,
    },
    '/circuits/details': {
      get: getCircuitDetail,
    },
    '/influencers': {
      get: getCollectors,
    },
    '/influencers/details': {
      get: getCollectorDetail,
    },

    '/dealers': {
      get: getDealers,
    },

    '/get-asset-class': {
      get: getAsset,
    },
    '/list/{type}': {
      get: getList,
    },
    '/cars/': {
      get: getAllCars,
    },
    '/get-valuation/': {
      post: carValuation,
    },
    '/suggestions/': {
      get: getAllSuggestions,
      post: suggestionsCreateRequest,
      put: suggestionsUpdateRequest,
    },
  },
  definitions: {
    dealersPageResponse,
    dealersResult,
    commonResponse: resultData,
    collector: collectorDefiniton,
    club: clubDefinition,
    driver: driverDefinition,
    car: carDefinition,
    circuit: circuitDefintion,
    getAssetdefinition,
    getListDefinition,
    error404Schema,
    login,
    loginResponse,
    carList,
    valuation,
    valuationResponse,
    suggestionList,
    suggestionCreate,
    suggestionUpdate,
    suggestionCreateResponse,
    suggestionUpdateResponse,
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export { apiDocumentation };
