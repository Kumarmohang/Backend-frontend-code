import Mssql from 'mssql';
import Vin from './model';
import { runCommand } from '../../util/shellUtil';
import config from '../../config';
import SpecificCar from '../specificCar/model';
import AuctionCar from '../auction/model';
import Car from '../car/model';
import { CarsForSell } from '../dealer/model';
// import { carsByDealerSearchParser } from '../dealer/serializer';
import { documentParser as specificCarDocumentParser } from '../specificCar/serializer';
import { documentParser as auctionDocumentParser } from '../auction/serializer';
import { carsListParser } from '../car/serializer';
import { isEmpty } from '../../util';

/**
 * Parse the vin document
 * @param {Object} document - argument is an object
 * @returns {Object} - returns object
 */
function vinDocumentParser(document) {
  const model =
    `${document?.Model ? document?.Model : ''}${
      document?.Series ? ` ${document?.Series}` : ''
    }` || '-';
  return {
    make: document?.Make || '-',
    manufacturer: document['Manufacturer Name'] || '-',
    model,
    years: [document['Model Year']] || [],
    'vehicle type': document['Vehicle Type'],
    country: document['Plant Country'] || '-',
    'Body Class': document['Body Class'] || '-',
    'Engine Model': document['Engine Model'] || '-',
    'Fuel Type - Primary': document['Fuel Type - Primary'] || '-',
    'Engine Configuration': document['Engine Configuration'] || '-',
  };
}

/**
 * Parser for vindatabase collection response
 * @param {Document} doc - document
 * @returns {Object} - returns object
 */
function vinDatabaseParser(doc) {
  return {
    make: doc?.brand_name || '-',
    model: doc?.model_name || '-',
    years: [doc?.model_year] || [],
    vinToken: doc?.vin_token || '-',
  };
}

// need to change hard coded typed vin in below
/**
 * function returns vin  metadata from nhtsa database
 * @param {string} vin -type string
 * @returns {Object} - returns a object
 */
async function nhtsaDatabase(vin) {
  const vinDict = {};
  // console.log(vin, '**');
  const result1 = await Mssql.query(
    'EXEC [dbo].[spVinDecode] @v = N' + "'" + `${vin}` + "'"
  );

  // const resultArr = [];
  result1.recordset.forEach((columns) => {
    if (columns.GroupName != null && columns.value !== 'Not Applicable') {
      /* const dict = {
      columns?.Variable : columns?.Value,
      }; */
      vinDict[columns?.Variable] = columns?.Value;
      /* resultArr.push(dict); */
    }
  });
  // console.log(vinDict);
  return vinDocumentParser(vinDict);
}

/* const dummynhtsa = {
  make: 'LAMBORGHINI',
  manufacturer: 'AUTOMOBILI LAMBORGHINI SPA',
  Model: 'Huracan EVO Spyder',
  years: ['2020'],
  'Vehicle Type': 'PASSENGER CAR',
  country: 'ITALY',

  'Body Class': 'Convertible/Cabriolet',
  'Engine Model': 'DGF',

  'Fuel Type - Primary': 'Gasoline',
  'Engine Configuration': 'V-Shaped',
}; */
/**
 * @param {string} vinNo - VIN number.
 * @returns {{status: string, message: string}} - Returns .
 */
export const getVinDetails = (vinNo) => {
  try {
    const vinInfoCmd = runCommand(config.PYTHON_PATH, [
      config.VIN_SCRIPT_PATH,
      vinNo,
    ]);

    const cmdResult = JSON.parse(vinInfoCmd.stdout.toString());
    // return vinInfo;
    if (!cmdResult.is_error) {
      return {
        status: 'success',
        details: cmdResult,
      };
    }
    if (cmdResult.is_error && cmdResult.type === 'ValidationError') {
      // throwApiError(cmdResult.error, 400);
      return { details: {}, status: 'fail', message: cmdResult.error };
    }
    // throwApiError(cmdResult.error, 500);
    return { details: {}, status: 'fail', message: cmdResult.error };
  } catch (error) {
    throw error;
  }
};

/**
 * Function returns model ,key
 * @param {String} modelName - modelname
 * @param {string} brandName - brandname
 * @returns {Object} - returns object
 */
export const getModelKey = (modelName, brandName) => {
  // console.log(modelName, brandName);
  let modelNameFormat;
  // let brandNameFormat;
  if (!modelName.toLowerCase().includes(brandName.toLowerCase())) {
    modelNameFormat = `${brandName} ${modelName}`;
  } else {
    modelNameFormat = modelName;
  }
  const words = brandName.toLowerCase().split('-');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  // console.log(words);

  // console.log(words);
  const brandNameFormat = words.join('-');
  // console.log(brandNameFormat, modelNameFormat);
  try {
    // console.log(config.GET_KEYSCRIPT_PATH);
    const vinInfoCmd = runCommand(config.PYTHON_PATH, [
      config.GET_KEYSCRIPT_PATH,
      modelNameFormat,
      brandNameFormat,
    ]);

    const cmdResult = JSON.parse(vinInfoCmd.stdout.toString());
    // return vinInfo;
    // console.log(cmdResult);
    if (!cmdResult.is_error) {
      return {
        status: 'success',
        details: cmdResult,
      };
    }
    if (cmdResult.is_error && cmdResult.type === 'ValidationError') {
      // throwApiError(cmdResult.error, 400);
      return { details: {}, status: 'fail', message: cmdResult.error };
    }
    // throwApiError(cmdResult.error, 500);
    return { details: {}, status: 'fail', message: cmdResult.error };
  } catch (error) {
    throw error;
  }
};

/**
 * @param {string} vinNo - VIN number.
 * @returns {object} - Returns .
 */
export const searchCar = async (vinNo) => {
  try {
    let carKey = '';
    let carInfo = null;
    const specificCar = await SpecificCar.findOne({
      'identification.identity_numbers': {
        $elemMatch: { $regex: new RegExp(`^${vinNo}$`, 'i') },
      },
    });
    // console.log(specificCar);
    if (specificCar && specificCar.key) {
      carInfo = specificCarDocumentParser(specificCar);
      carInfo.group = 'Specific Cars';
      carKey = specificCar.key;
    } else {
      const auctionCar = await AuctionCar.findOne({
        'identification.identity_numbers': {
          $regex: new RegExp(`^${vinNo}$`, 'i'),
        },
      });
      if (auctionCar && auctionCar.key) {
        carInfo = auctionDocumentParser(auctionCar);
        carInfo.group = 'Auction Data';
        carKey = auctionCar.key;
      } else {
        const dealerCar = await CarsForSell.findOne({
          'identification.identity_numbers': {
            $regex: new RegExp(`^${vinNo}$`, 'i'),
          },
        });
        // console.log(dealerCar, vinNo);
        if (dealerCar && dealerCar.key) {
          carInfo = auctionDocumentParser(dealerCar);
          // console.log(carInfo);
          carInfo.group = 'Cars For Sale';
          carKey = dealerCar.key;
        }
      }
    }
    let modelInfo = null;
    if (carKey) {
      const car = await Car.findOne({ key: carKey });
      if (car) {
        modelInfo = carsListParser(car);
        if (car.year_wise_specifications) {
          modelInfo.year_wise_specifications = car.year_wise_specifications;
        } else {
          modelInfo.specifications = car.specifications;
        }
      }
    }
    return {
      carKey,
      carInfo,
      modelInfo,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * This function get the car details from the VIN library and our database.
 * @param {string} vinNo - VIN number.
 * @returns {object} - Returns .
 */
export const getCarDetailsByVin = async (vinNo) => {
  try {
    let vinResult;
    let vinDatabaseResult;
    const fieldStore = {};
    // console.log(vindatabaseResult);
    // const vinMetadata = getVinDetails(vinNo);
    const carInfo = await searchCar(vinNo);
    if (vinNo.length === 17) {
      vinResult = await nhtsaDatabase(vinNo);
      // console.log(vinResult);
      if (vinResult.make === '-' || vinResult.model === '-') {
        const vin = vinNo.substring(0, 11);
        vinDatabaseResult = await Vin.findOne({ vin_token: vin });
        vinDatabaseResult = vinDatabaseParser(vinDatabaseResult);
        // format vin Result using document parser

        if (vinDatabaseResult.make !== '-' && vinDatabaseResult.model !== '-') {
          vinResult = { ...vinResult, ...vinDatabaseResult };
        }
      }

      if (
        // carInfo.carKey === '' &&
        vinResult.model !== '-' &&
        vinResult.make !== '-'
      ) {
        const carKey = await getModelKey(vinResult.model, vinResult.make);
        // console.log({ carKey });
        if (carKey.details !== '') {
          const car = await Car.findOne({ key: carKey.details });
          if (car) {
            carInfo.modelInfo = carsListParser(car);
            if (car.year_wise_specifications) {
              carInfo.modelInfo.year_wise_specifications =
                car.year_wise_specifications;
            } else {
              carInfo.modelInfo.specifications = car.specifications;
            }
          }
        }
      }
    }
    if (carInfo) {
      if (carInfo?.modelInfo?.make) {
        fieldStore.make = carInfo?.modelInfo?.make;
      }
      if (carInfo?.modelInfo?.model) {
        fieldStore.model = carInfo?.modelInfo?.model;
      }
      if (carInfo?.carInfo?.model_year) {
        fieldStore.years = [carInfo?.carInfo?.model_year.toString()];
      }
    }
    if (isEmpty(vinResult?.manufacturer) && carInfo.carInfo) {
      vinResult = {
        manufacturer: carInfo.carInfo.make,
        ...fieldStore,
        ...vinResult,
      };
    }
    return {
      /* vinDetails: { ...vinMetadata.details }, */
      vinDetails: { ...vinResult, identifier: vinNo },
      carModel: { ...carInfo.modelInfo },
      carInfo: { ...carInfo.carInfo },
    };
  } catch (error) {
    throw error;
  }
};

// nhtsaDatabase('jshsajjj');
