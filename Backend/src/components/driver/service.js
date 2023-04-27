import { Drivers } from './model';
import { getDataWithPages, getDocumentById } from '../common/services/dbUtils';
// import { Mongoose } from 'mongoose';

/**
 *
 * @typedef {import('mongoose').Document} Document
 * 
 * @typedef {{
    date: Date,
    circuit: String,
    circuit_key: String,
    race_name: String,
    race_key: String,
    position: String,
    pole_position: Boolean,
    fastest_lap: Boolean,
  }} RaceDetails
 * 
 * @typedef {{
    event_name: String,
    event_key: String,
    position: String,
    points: String,
    team: String,
    team_key: String,
    races: String,
    category: String,
    wins: String,
    engine: String,
    tyres: String,
    car: String,
    podiums: String,
    year: String
    race_results: Array<RaceDetails>,
  }} CareerDetail
 *
  @typedef {Object<string, Array<CareerDetail>>} YearWiseData
 */

/**
 * This function is used to format the data for the response
 * @param {Document} document - Driver record
 * @returns {Object} - Formatted Driver record
 */
function driverSearchParser(document) {
  return {
    thumbnail:
      document?.images?.[0] ||
      document?.driver_images?.[0] ||
      '/api/static/dummy/dummy-driver.png',
    key1: 'Nationality',
    value1: document.nationality,
    header: document.name,
    is_clickable: false,
    link: document.driver_link,
    id: document._id,
  };
}

/**
 * @description - This method handles the request to get all the drivers
 * @param {{search:string, fetchSize: string, pageNo : string}} req - The request object
 * @returns {Promise<CardData>} - The response object
 */
export const getAllDriver = async ({ search, fetchSize, pageNo }) => {
  try {
    const query = {};
    if (search) {
      query.name = {
        $regex: `.*${search.replace(/\s/g, '\\s')}.*`,
        $options: 'i',
      };
    }

    const limit = parseInt(fetchSize || 10, 10);
    const skip = parseInt(pageNo || 0, 10) * limit;

    const { cursor, total } = await getDataWithPages(
      Drivers,
      query,
      { race_count: -1 },
      skip,
      limit
    );
    return {
      data: {
        results: cursor.map(driverSearchParser),
        total,
      },
    };
  } catch (error) {
    throw error;
  }
};

/**
 * @description This function returns year wise formatted data for the of events played by the driver.
 * @param {Array<CareerDetail>} eventList - List of events played by the driver.
 * @returns {YearWiseData} - Formatted Year wise Data.
 */
const getYearWiseDriverEvents = (eventList = []) => {
  const yearWiseData = {};
  eventList.forEach((ele) => {
    const dataList = yearWiseData[ele.year];
    if (dataList) {
      dataList.push(ele);
      return;
    }
    yearWiseData[ele.year] = [ele];
  });
  return yearWiseData;
};

/**
 *
 * @param {YearWiseData} yearWiseData - Formated year wise data
 * @returns {Array<Object>} - Formatted year wise data with out _ .
 */
const formateDriverCareerData = (yearWiseData) => {
  const formattedData = Object.keys(yearWiseData)
    .reverse()
    .map((key) => {
      const yearEventData = yearWiseData[key].map((ele) => {
        const formattedKeyData = {};
        Object.keys(ele).forEach((formatkey) => {
          const newKey = formatkey.replace(/_/g, ' ');
          formattedKeyData[newKey] = ele[formatkey];
        });
        return formattedKeyData;
      });
      return yearEventData;
    });
  return formattedData;
};

/**
 *
 * @param {CareerDetail} eventList - Driver career data
 * @returns {Array<Object>} - Driver Racing highlights
 */
const getHighlightsDriverData = (eventList) => {
  const racingHighlightsData = eventList.filter(
    (ele) => ele.category === 'Racing' && !!ele.position && ele.position <= 3
  );
  const kartingHighlightsData = eventList.filter(
    (ele) => ele.category === 'Karting' && !!ele.position && ele.position <= 3
  );

  const eSportsHighlightsData = eventList.filter(
    (ele) => ele.category === 'ESports' && !!ele.position && ele.position <= 3
  );

  const highlightsData = [];

  if (racingHighlightsData.length > 0) {
    highlightsData.push({
      name: 'Racing Highlights',
      value: racingHighlightsData,
    });
  }
  if (kartingHighlightsData.length > 0) {
    highlightsData.push({
      name: 'Karting Highlights',
      value: kartingHighlightsData,
    });
  }
  if (eSportsHighlightsData.length > 0) {
    highlightsData.push({
      name: 'ESports Highlights',
      value: eSportsHighlightsData,
    });
  }
  return highlightsData;
};

/**
 *
 * @param {any} document - Driver record
 * @returns {any} - Formatted Driver record
 */
export function getDriverDetails(document) {
  const yearWiseDriverEvents = getYearWiseDriverEvents(
    document?.career_details?.toObject()
  );
  const formateDriverCareerEvents =
    formateDriverCareerData(yearWiseDriverEvents);
  const doc = {
    overview: [
      {
        name: 'Nationality',
        value: document?.nationality || '-',
      },
    ],
    section3: [...getHighlightsDriverData(document?.career_details)],
    image:
      document?.images?.[0] ||
      document?.driver_images?.[0] ||
      'api/static/dummy/dummy-driver.png',
    id: document._id,
    name: document?.driver_name || document.name || '-',
  };
  doc.raceHistory = formateDriverCareerEvents;
  if (document.highlights) {
    if (!Array.isArray(document.highlights)) {
      doc.section3.push({
        name: 'Highlights',
        value: Object.entries(document.highlights).map(([key, value]) => ({
          key: key.replace(/_/g, ' '),
          value,
        })),
      });
    } else {
      doc.section3.push({
        name: 'Highlights',
        value: document.highlights.map((ele) => ({
          key: ele.text,
          link: ele.link,
        })),
      });
    }
  }
  if (document.description && document.description.length) {
    doc.section2 = {
      name: 'Description',
      value: Array.isArray(document.description)
        ? document.description
        : [document.description],
    };
  }

  if (document.cars) {
    // console.log(JSON.stringify(document.cars, null, 2));
    doc.section3.push({
      name: 'Cars',
      value: document.cars.map((ele) => ({
        id: ele.car._id,
        title: ele.car.title,
        key: ele._id,
        thumbnails: ele.car.thumbnails,
      })),
    });
  }

  const bio = Object.entries(document?.bio?.toObject() || {}).map(
    ([key, value]) => ({
      name: key.replace(/_/g, ' '),
      value,
    })
  );
  // console.log({ document: document.bio, bio });
  doc.overview = [...doc.overview, ...bio];

  return doc;
}

/**
 * @description - This method handles the request to get  driver by id
 * @param {{id:String}} req - The request object
 * @returns {Promise<any>} - The response object
 */
export const getFormattedDriverById = async ({ id }) => {
  try {
    const driver = await getDocumentById(Drivers, id);
    if (!driver) {
      throwApiError('Record not found', 404);
    }
    return {
      data: getDriverDetails(driver._doc),
    };
  } catch (error) {
    throw error;
  }
};
