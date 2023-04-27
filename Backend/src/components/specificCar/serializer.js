import { getImages, getThumbnailUrl } from '../common/services/imageUtil';
import { mergeSpecs } from '../common/services/specificationFormatter';
/**
 *
 * @param {any} document - The Specific car document to be serialized
 * @returns {object} - The serialized Specific car document
 */
export const getSpecificCarDetails = (document) => {
  const doc = {
    name: document.title,
    serial_number: document.serial_number,
    image: getImages(document.images),
    specifications: mergeSpecs(document?.car?.specifications || {}),
    overview: [
      { name: 'Serial No.', value: document.serial_number },
      {
        name: 'Source',
        value: document?.all_sources?.[0].source_name || '',
        link: document?.all_sources?.[0].url,
        clickable: true,
      },
      {
        name: 'Auctions',
        value: document.auctionCount,
        clickable: true,
        key: document.key,
        serial_no: document.serial_number,
      },
      {
        name: 'Model Name',
        value: document?.car?.title || 'Not Available',
        clickable: !!document?.car?.title,
        key: document?.car?._id || '-',
      },
    ],
  };
  // description: document?.car?.description ? document.car.description : '',
  if (document?.description?.length > 0) {
    doc.description = document.description;
    doc.is_dec_from_source = true;
  } else if (document?.car?.description?.length) {
    doc.description = document.car.description;
    doc.is_dec_from_source = false;
  }
  if (document.timeline && document.timeline.length) {
    doc.timeline = document.timeline
      .sort((a, b) => a.displayDate - b.displayDate)
      .map((ele) => {
        const timeline = {
          date: ele.date,
          info: ele.info,
          image: ele.images || [],
          displayDate: ele.displayDate || '-',
          auction: null,
        };

        return timeline;
      });
  }
  if (document.restoration) {
    doc.restoration_process = document.restoration;
  } else if (document.restoration_process) {
    doc.restoration_process = document.restoration_process;
  }

  /* if (document?.source === 'Classics Cars') {
    doc.history = document.description_list.slice(1);
  } */

  if (document.all_sources.length > 1) {
    doc.overview[1] = {
      name: 'Sources',
      value: document.all_sources,
    };
  }
  doc.modelKey = document.key;
  return doc;
};

/**
 *
 * @param {any} document - The Specific car document to be serialized
 * @param {String} subCat - The sub category of the car
 * @returns {object} - The serialized Specific car document
 */
export function specificCarSearchParser(document) {
  return {
    thumbnail: getThumbnailUrl(document.images),
    key1: 'Serial No',
    value1: document?.serial_number || '-',
    // key1: 'Source',
    // value1: subCat || 'Barchetta',
    header: document.title,
    id: document._id,
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
    serial_number: document?.serial_number || '-',
    title: document.title,
    id: document._id,
    images: getImages(document.images),
    description: document.description || [],
    make: document.brand_name || '',
    highlights: document.highlights || [],
    identification: document.identification,
    model_year: document.model_year || '-',
  };
}
