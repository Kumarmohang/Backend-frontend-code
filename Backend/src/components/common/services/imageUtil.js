/* eslint-disable no-nested-ternary */
/**
 * @typedef {{original_url: string, thumbnail:string, originalUrl: string}} ImageObj
 * @typedef {{original: string, thumbnail: string, description?: string}} FormattedImage
 */
const MISSING_IMAGE_URL =
  'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg';

/**
 * This function returns a boolean and tell is this image is active or not
 * @param {any} image image
 * @returns {boolean} Image is active or not.
 */
function imageIsActive(image) {
  const { is_active: isActive = true } = image;
  return isActive !== null ? isActive : true;
}

/**
 *
 * @param {string} imageUrl - the url of the image
 * @returns {string} - the url of the image
 */
export const fixImageUrl = (imageUrl) =>
  imageUrl.startsWith('/api/static')
    ? `https://driven.perpetualblock.io${imageUrl}`
    : imageUrl;

/**
 *
 * @param {Array<ImageObj>} imagesArray - List of images
 * @param {boolean} isCar - Whether to return thumbnail or original image
 * @returns {string} - Image thumbnail url
 */
export const getThumbnailUrl = (imagesArray, isCar = false) =>
  imagesArray?.[0]?.thumbnail ||
  imagesArray?.[0]?.cloud_url ||
  imagesArray?.[0]?.original_url ||
  imagesArray?.[0]?.originalUrl ||
  imagesArray?.[0]?.cloudUrl
    ? fixImageUrl(
        imagesArray?.[0]?.thumbnail ||
          imagesArray?.[0]?.cloud_url ||
          imagesArray?.[0]?.original_url ||
          imagesArray?.[0]?.originalUrl ||
          imagesArray?.[0]?.cloudUrl
      )
    : !isCar
    ? MISSING_IMAGE_URL
    : 'https://driven.perpetualblock.io/api/static/no_image.png';

/**
 *
 * @description This function returns formatted image url object.
 * @param {Array<ImageObj>} imageArray - List of images.
 * @param {Boolean} isCar - Formatted image url object.
 * @returns {Array<FormattedImage>} - Image object.
 *
 */
export const getImages = (imageArray, isCar = false) => {
  if (
    imageArray?.length === 0 ||
    imageArray === undefined ||
    imageArray == null
  ) {
    return [
      {
        original: !isCar
          ? MISSING_IMAGE_URL
          : 'https://driven.perpetualblock.io/api/static/no_image.png',
        thumbnail: !isCar
          ? MISSING_IMAGE_URL
          : 'https://driven.perpetualblock.io/api/static/no_image.png',
      },
    ];
  }
  const images = imageArray.filter(imageIsActive).map((imageToObject) => {
    const image = imageToObject.toJSON();
    return {
      original:
        image?.cloud_url ||
        image?.cloudUrl ||
        image?.original_url ||
        image?.originalUrl
          ? fixImageUrl(
              image?.cloud_url ||
                image?.original_url ||
                image?.cloudUrl ||
                image?.originalUrl
            )
          : !isCar
          ? MISSING_IMAGE_URL
          : 'https://driven.perpetualblock.io/api/static/no_image.png',
      thumbnail:
        image?.thumbnail ||
        image?.cloudUrl ||
        image?.cloud_url ||
        image?.original_url ||
        image?.originalUrl
          ? fixImageUrl(
              image?.thumbnail ||
                image?.cloud_url ||
                image?.original_url ||
                image?.cloudUrl ||
                image?.originalUrl
            )
          : !isCar
          ? MISSING_IMAGE_URL
          : 'https://driven.perpetualblock.io/api/static/no_image.png',
      description: image?.description,
    };
  });
  return images;
};
