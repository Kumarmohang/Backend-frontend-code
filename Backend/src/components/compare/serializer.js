import { getImages } from '../common/services/imageUtil';

/**
 *
 * @param {Document} document - document object
 * @returns {Document} - returns document
 */
export function getComparisonDetails(document) {
  const doc = {
    id: document._id,
    name: document.title || '',
    image: getImages(document?.images),
    overview: [
      {
        name: 'Launch Year',
        value: document?.launch_year || '-',
      },
      {
        name: 'Car Type',
        value: document?.car_type || '-',
      },
    ],
    // specifications: document?.ye || document?.specifications || {},
    header: document.title,
  };
  if (document.year_wise_specifications) {
    doc.specifications = Object.entries(document.year_wise_specifications).map(
      ([key, value]) => ({
        year: key,
        specifications: value,
      })
    );
  } else {
    doc.specifications = [
      {
        year: document?.launch_year ? document?.launch_year : null,
        specifications: document?.specifications
          ? document?.specifications
          : null,
      },
    ];
  }
  return doc;
}
