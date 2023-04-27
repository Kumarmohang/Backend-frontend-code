/* eslint-disable no-unused-vars */
// import { isEmpty, numberWithCommas } from '../../util';
import { getImages, getThumbnailUrl } from '../common/services/imageUtil';
import { mergeSpecs } from '../common/services/specificationFormatter';

/**
 *
 * @param {Object} document - CarYear Model record
 * @returns {Object} - Formatted CarYear Model record
 */
export const getCarYearDocument = (document) => {
  const out = {
    id: document._id,
    name: document.title || '',
    image: getImages(document.images, true),
    section2: {
      name: 'Description',
      value: document.description || [],
    },

    overview: [
      {
        name: 'Launch Year',
        value: document?.launch_year || '-',
      },
      {
        name: 'Brand',
        value: document?.brand_name || '-',
      },
      {
        name: 'Car Type',
        value: document?.car_type || '-',
      },
    ],

    header: document.title,
    showThumbnail: true || false,
  };

  if (document.year_wise_specifications) {
    out.specifications = Object.entries(document.year_wise_specifications).map(
      ([key, value]) => ({
        year: key,
        specifications: mergeSpecs(value),
      })
    );
  } else {
    out.specifications = mergeSpecs(document?.specifications) || mergeSpecs({});
  }

  if (document.drivers && document.drivers.length) {
    out.section3.push({
      name: 'Related Drivers',
      value: document.drivers.map((ele) => ({
        name: ele.name,
        link: ele.driver_link,
        thumbnail: ele.images?.[0] || null,
        flag_image: ele.flag_link,
        nationality: ele.nationality,
        id: ele._id,
      })),
    });
  }

  if (document?.roof_top && document.roof_top !== 'unknown') {
    out.overview.push({
      name: 'Roof Top',
      value: document.roof_top,
    });
  }

  if (document?.category && document?.category !== 'Unknown') {
    out.overview.push({
      name: 'Category',
      value: document.category,
    });
  }
  if (document.year) {
    out.overview.push({
      name: 'Launch Year',
      value: document.year,
    });
  }

  if (document?.series && document?.series !== '') {
    out.overview.push({
      name: 'Series',
      value: document?.series,
    });
  }

  if (document?.specifications?.Body['Seating Capacity' || {}]) {
    out.overview.push({
      name: 'Num of Seats',
      value: document.specifications.Body['Seating Capacity'].finalSpecValueStr,
    });
  }

  if (document?.general_info?.production_count) {
    out.overview.push({
      name: 'Production Count',
      value: document?.general_info?.production_count || '-',
    });
  }

  if (
    document?.specifications?.Body?.Doors &&
    document?.specifications?.Body?.Doors?.finalSpecValueStr !== '-'
  ) {
    out.overview.push({
      name: 'Doors',
      value: document?.specifications?.Body?.Doors?.finalSpecValueStr,
    });
  }

  if (document.roof_top && document.roof_top !== 'unknown') {
    out.overview.push({
      name: 'Roof top',
      value: document.roof_top,
    });
  }

  return out;
};

/**
 *
 * @param {any} document  - CarYear record.
 * @returns {any} - Formatted CarYear record .
 */
export const carYearSearchParser = (document) =>
  // console.log({ document });
  ({
    thumbnail: getThumbnailUrl(document.images, true),

    key1: 'Release Year',
    value1: document?.launch_year || '-',
    header: document.title || '-',
    id: document._id,
    make: document.brand_name,
    series: document.series,
    model: document.model,
    year: document?.launch_year || '-',
    is_upcoming: document?.is_upcoming,
    year_wise_specifications: document?.year_wise_specifications,
    category: document?.category,
    roof_top: document?.roof_top,
    engine_type: document?.specifications?.Engine?.Type.finalSpecValueStr,
    num_doors: document?.specifications?.Body?.Doors?.finalSpecValueStr,
  });

/**
 *
 * @param {any} document  - Car record.
 * @returns {any} - Formatted Car record .
 */
export const carsListParser = (document) =>
  // console.log({ document });
  ({
    thumbnail: getThumbnailUrl(document.images, true),
    title: document.title || '-',
    id: document._id,
    make: document.brand_name,
    model: document.model,
    series: document.series || '-',
    year: document?.launch_year || '-',
    category: document?.category || '-',
    specifications: document?.specifications || {},
    // no_of_seats:
    //   document?.specifications?.Body['Seating Capacity' || {}]
    //     ?.finalSpecValueStr,
    gear_type: document?.gear_type,
    roof_top: document?.roof_top,
    num_doors: document?.specifications?.Body?.Doors?.finalSpecValueStr,
  });
