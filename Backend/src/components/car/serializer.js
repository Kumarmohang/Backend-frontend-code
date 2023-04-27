/* eslint-disable no-unused-vars */
import { isEmpty, numberWithCommas } from '../../util';
import { getImages, getThumbnailUrl } from '../common/services/imageUtil';
import { mergeSpecs } from '../common/services/specificationFormatter';
// import { formatSpecification } from '../common/services/specificationFormatter';

/**
 *
 * @param {Object} document - Car Model record
 * @returns {Object} - Formatted Car Model record
 */
export const getAnalyticsDocument = (document) => {
  const out = {
    result: document.car_analytics || '',
  };
  return out;
};
/**
 *
 * @param {Object} document - Car Model record
 * @returns {Object} - Formatted Car Model record
 */
export const getCarsDocument = (document) => {
  const out = {
    id: document._id,
    name: document.title || '',
    image: getImages(document.images, true),
    section2: {
      name: 'Description',
      value: document.description || [],
    },
    section3: [
      {
        name: 'Auctions',
        value: [{ count: document.auction, key: document.key }],
      },
      {
        name: 'Cars From Dealers',
        value: [{ count: document.dealerCars, key: document.key }],
      },
      {
        name: 'Specific Cars',
        value: [{ count: document.specificCars, key: document.key }],
      },
      {
        name: 'Similar Cars',
        value: document.similarCars,
      },
    ],
    overview: [
      {
        name: 'Launch Year',
        value: document?.launch_year || '-',
      },
      {
        name: 'Brand',
        value: document?.brand_name || '-',
      },
      // {
      //   name: 'Final Merge UUID',
      //   value: document?.final_merge_uuid || '-',
      // },
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
  for (let i = 0; i < document?.news?.length; i++) {
    out.section4.value.push({
      clickable: true,
      name: document.news[i].title,
      link: document.news[i].source_url,
      heading: `${document.news[i].date}:${document.news[i].title}`,
      sentiment: 'positive',
    });
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
  if (document.events && document.events.length) {
    /* out.section3.push({
      name: 'Events',
      value: document?.events || [],
    }); */
  }

  if (document?.k500_rating) {
    out.overview.push({
      name: 'K500 Rating',
      value: document.k500_rating.rating,
      clickable: true,
      link: document.k500_rating.link,
    });
  }

  if (document?.roof_top && document.roof_top !== 'Unknown') {
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
      value: document.series,
    });
  }

  if (document?.specifications?.Engine?.Type) {
    out.overview.push({
      name: 'Engine',
      value: document.specifications.Engine.Type.value || '-',
    });
  }

  if (document?.general_info?.production_count) {
    out.overview.push({
      name: 'Production Count',
      value: document?.general_info?.production_count || '-',
    });
  }

  if (
    document?.general_info?.car_designers &&
    document?.general_info?.car_designers.length
  ) {
    out.overview.push({
      name: 'Designers',
      value: document.general_info.car_designers.join(', ') || '-',
    });
  }
  /*
  
  */
  /*
  Object.entries(document.k500GraphData.k500_price).map(([key, value]) => ({
        condition: key,
        price: value
      })
  */

  const hagertyData = document?.k500GraphData?.hagerty_price;
  // console.log({ hagertyData });

  if (hagertyData && !isEmpty(hagertyData)) {
    const keyValueArray = Object.entries(hagertyData);
    const hagertyPrice = keyValueArray.map(([key, value]) => {
      const data = {
        year: `Model year: ${key} | Avg Price: USD ${numberWithCommas(
          value?.averageValue || '-'
        )}`,
        value: Object.entries(value)
          .filter(([condition]) => condition !== 'averageValue')
          .map(([condition, price]) => ({
            condition,
            price: `USD ${numberWithCommas(price || '')}`,
          })),
      };
      return data;
    });
    out.section3.push({
      name: 'Resale Price',
      value: { price_data: hagertyPrice },
    });
  }

  if (document?.is_racing) {
    out.overview.push({
      name: 'Racing car',
      value: 'Racing Car',
    });
  }
  if (document?.is_concept) {
    out.overview.push({
      name: 'Concept_car',
      value: 'Concept Car',
    });
  }
  if (document?.is_fewoffs) {
    out.overview.push({
      name: 'Fewoffs',
      value: 'Fewoffs',
    });
  }

  if (!isEmpty(document?.k500GraphData?.k500_price || {})) {
    const dataValue = document?.k500GraphData?.k500_price?.map((ele) => ({
      condition: ele.condition,
      price: ele.price,
    }));
    out.section3.push({
      name: 'K500 Price Data',
      value: dataValue,
    });
  }
  return out;
};

/**
 *
 * @param {any} document  - Car record.
 * @returns {any} - Formatted Car record .
 */
export const carsSearchParser = (document) =>
  // console.log({ document });
  ({
    thumbnail: getThumbnailUrl(document.images, true),

    // key1: 'Engine',
    // value1: document?.specifications?.Engine?.Type?.value || '-',
    // document?.specifications?.Engine?.['Maximum power'],
    key1: 'Release Year',
    value1: document?.launch_year || '-',
    header: document.title || '-',
    id: document._id,
    is_concept: document.is_concept,
    is_fewoffs: document.is_fewoffs,
    is_racing: document.is_racing,
    make: document.brand_name,
    model: document.model,
    year: document?.launch_year || '-',
    is_upcoming: document?.is_upcoming,
    final_merge_uuid: document?.final_merge_uuid,
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
    is_concept: document.is_concept,
    is_fewOffs: document.is_fewoffs,
    is_racing: document.is_racing,
    make: document.brand_name,
    model: document.model,
    year: document?.launch_year || '-',
    car_type: document?.car_type || 'Other',
    is_upcoming: document.is_upcoming,
    specifications: document?.specifications || {},
    is_f1: document?.is_f1,
    series: document?.series,
    final_merge_uuid: document?.final_merge_uuid,
  });
