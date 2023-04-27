/* eslint-disable no-unsafe-optional-chaining */

// import { numberWithCommas } from '../../util';
import { getImages, getThumbnailUrl } from '../common/services/imageUtil';
import { getFormattedPrice } from '../common/services/priceUtil';
import { mergeSpecs } from '../common/services/specificationFormatter';

/**
 *
 * @param {Object} document - Auction record
 * @returns {Object} - Formatted auction record
 */
export const getAuctionDocument = (document) => {
  const doc = {
    id: document._id,
    name: document.title || '',
    image: getImages(document.images),
    section1: {
      name: 'Highlights',
      value: document.highlights || [],
    },
    section2: {
      name: 'Description',
      value: document.description || [],
    },
    /*
        NEW CHANGE
        ADD Highlight in section 3
       */
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
      },
      {
        name: 'Chassis No.',
        value:
          document.identification?.chassis_no ||
          document.identification?.serial_no ||
          document.identification?.body_no ||
          document.identification?.registration_no ||
          document.identification?.identification_no ||
          document.identification?.vin ||
          document.identification?.engine_no,
      },
      {
        name: 'Engine No.',
        value:
          document.identification?.engine_no ||
          document.identification?.serial_no ||
          document.identification?.body_no ||
          document.identification?.registration_no ||
          document.identification?.identification_no ||
          document.identification?.vin ||
          document.identification?.chassis_no,
      },
      /*  {
        name: 'Token Id',
        value: document.token || '-',
        clickable: !!document.token,
        link: document.chain_link,
      }, */
      {
        name: 'Auction House',
        value: document?.auction_house || '-',
        clickable: !!document?.auction_house,
        link: document?.url || document?.auction_link || '',
      },
      {
        name: 'Auction listing Date',
        value: document.auction_date,
      },
      {
        name: 'Model Name',
        value: document?.car?.title || 'Not Available',
        clickable: !!document?.car?.title,
        key: document?.car?._id || '-',
      },
    ],

    /* 
        NEW CHANGE
        For Showing specification section
      */
    specifications: mergeSpecs(document?.car?.specifications || {}),
    /* Object.entries(document?.car?.specifications || {})
      // eslint-disable-next-line no-unused-vars
      .filter(([_key, value]) => !isEmpty(value))
      .map(([key, value]) => ({ title: key, value })) */ /* ------------------------------- */
    isNft: !!document.token || false,
    header: ' ',
    // id: '12312',
    showThumbnail: true,
  };
  const { barchetta } = document;

  if (barchetta) {
    doc.section3.push({
      name: 'Timelines',
      value:
        barchetta.timeline?.map(
          ({ info, displayDate }) => `${displayDate}: ${info}`
        ) || [],
    });
    /* 
      ...barchetta.images_list.map(({ image_link, thumbnail_link, data_desc,desc_title}) => ({
        original: image_link || thumbnail_link,
          thumbnail:  thumbnail_link || image_link,
      }))
      */
    doc.image = [...doc.image, ...getImages(barchetta.images || [])];
  }
  if (document?.is_not_a_car) {
    doc.overview.push({
      name: 'Collectables',
      value: 'Collectables Item',
    });
  }
  doc.modelKey = document.key;
  doc.is_upcoming_auction = document.auction_date > new Date();
  return doc;
};

/**
 *
 * @param {any} document  - Auction record
 * @returns {Object} - Formatted auction record
 */
export function auctionSearchParser(document) {
  return {
    thumbnail: getThumbnailUrl(document.images),
    key2: 'Price',

    value2: getFormattedPrice(document.price),
    key1: 'Source',
    value1: document?.auction_house || '-',
    header: document.title, // document.is_nft ? ' ' : ' ',
    id: document._id,
    type: document?.is_not_a_car ? 'garbage' : 'car',
    is_garbage: document?.is_not_a_car,
    is_upcoming_auction: document.auction_date > new Date(),
    // is_nft: !!document.token,
    // show_nft_ico: true,
    // is_clickable: true,
  };
}

/**
 *
 * @param {any} document - The Specific car document to be serialized
 * @param {String} subCat - The sub category of the car
 * @returns {object} - The serialized Specific car document
 */
export function documentParser(document) {
  return {
    thumbnail: getThumbnailUrl(document.images),
    source: document?.auction_house || '-',
    title: document.title,
    id: document._id,
    price: getFormattedPrice(document.price),
    images: getImages(document.images),
    description: document.description || '',
    make: document.brand_name || '',
    highlights: document.highlights || [],
    identification: document.identification || {},
    model_year: document.model_year || '-',
  };
}
