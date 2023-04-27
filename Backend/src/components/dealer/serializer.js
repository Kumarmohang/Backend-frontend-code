import { numberWithCommas, isEmpty } from '../../util';
import { getImages, getThumbnailUrl } from '../common/services/imageUtil';
import { getFormattedPrice } from '../common/services/priceUtil';
import { mergeSpecs } from '../common/services/specificationFormatter';

/**
 * description - Serializer for All dealer result
 * @param {Document} document - Object Document
 * @returns  {Document} - Object Document
 */
export function dealerPageFormatter(document) {
  return {
    thumbnail:
      document.dealer_logo?.length > 5
        ? document.dealer_logo
        : 'https://www.ally.com/content/dam/assets/ally-assets/images/dealer-graphic-vehicle-protection.png',
    key1: 'Email',
    value1: document.email || '-',
    key2: 'Country',
    value2: document.country,
    header: document.dealer_name,
    // is_clickable: true,
    link: document.dealer_link,
    id: document._id,
    dealer_key: document.dealer_key,
    // extraData: "Address:249-251 Merton Road,London,SW18 5EB",
  };
}

/**
 *
 * @param {any} document - CarsForSell Record
 * @returns {any} - CarsForSell Record
 */
export const getSellBuyCarDetails = (document) => {
  const doc = {
    id: document._id,
    name: document.title || '',
    image: getImages(document.images),
    section2: {
      name: 'Description',
      // eslint-disable-next-line no-nested-ternary
      value: document.description
        ? Array.isArray(document.description)
          ? document.description
          : [document.description]
        : [],
    },
    section3: [
      {
        name: 'Highlights',
        value: document.highlights || [],
      },
    ],
    /* ------------------------------- */
    /* 
    "[Chassis No"]  ||[ */
    overview: [
      {
        name: 'Price',
        value: getFormattedPrice(document.price),
        title: document.price,
      },
      {
        name: 'Year',
        value: document.model_year,
      },
      {
        name: 'Source',
        value: document.source_name,
        clickable: true,
        link: document.url,
      },
      {
        name: 'Model Name',
        value: document?.car?.title || 'Not Available',
        clickable: !!document?.car?.title,
        key: document?.car?._id || '-',
      },
      /* {
        name: 'Status',
        value: document.is_sold ? 'Already Sold' : 'For Sell',
      }, */
    ],

    specifications: mergeSpecs(document?.car?.specifications || {}),
    /* Object.entries(document?.car?.specifications || {})
      // eslint-disable-next-line no-unused-vars
      .filter(([_key, value]) => !isEmpty(value))
      .map(([key, value]) => ({ title: key, value })) */ /* ------------------------------- */
    // id: '12312',
    showThumbnail: true,
  };
  const specification = document?.specifications;
  if (specification && !isEmpty(specification)) {
    doc.specifications = [
      { title: 'Car Specifications', value: specification },
      ...doc.specifications,
    ];
  }

  if (
    document.identification?.chassis_no ||
    document.identification?.serial_no ||
    document.identification?.body_no ||
    document.identification?.registration_no ||
    document.identification?.identification_no ||
    document.identification?.vin ||
    document.identification?.engine_no
  ) {
    doc.overview.push({
      name: 'Chassis No.',
      value:
        document.identification?.chassis_no ||
        document.identification?.serial_no ||
        document.identification?.body_no ||
        document.identification?.registration_no ||
        document.identification?.identification_no ||
        document.identification?.vin ||
        document.identification?.engine_no,
    });
  }
  if (
    document.price.predicted_price_max &&
    document.price.predicted_price_max
  ) {
    doc.overview.push({
      name: 'Predicted Price',
      value: `${numberWithCommas(
        document.price.predicted_price_min
      )} - ${numberWithCommas(document.price.predicted_price_max)} ${
        document.price.predicted_price_curr
      }`,
    });
  }
  return doc;
};

/**
 *
 * @param {any} document - CarsForSell Record
 * @returns {object} - Formatted CarsForSell Record
 */
export function carsByDealerSearchParser(document) {
  return {
    thumbnail: getThumbnailUrl(document.images),
    key1: 'Dealer',
    value1: document.source_name || '-',
    key2: 'Price',
    value2: getFormattedPrice(document.price),
    header: document.title,
    // is_clickable: true,
    id: document._id,
    isSold: document.is_sold,
  };
}
