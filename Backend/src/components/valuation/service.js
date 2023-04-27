import axios from 'axios';
import CONFIG from '../../config/index';

axios.defaults.baseURL = CONFIG.VALUATION_API_URL;

/**
 * This function is used to get valuation data from valuation server.
 * @param {Object} requestBody - Request data .
 * @returns {Object} - Response data.
 */
export const predictValuation = async (requestBody) => {
  try {
    const {
      key = '',
      car_name: carName = '',
      highlights = [],
      info = '',
      auction_house: auctionHouse = '',
      auction_year: auctionYear = '',
      price_usd: price = '',
    } = requestBody;
    const formattedHighlights =
      highlights.length > 0 ? highlights.join('||') : '';
    /* console.log(
      JSON.stringify(
        {
          key,
          car_name: carName,
          highlights: formattedHighlights,
          info,
          auction_house: auctionHouse,
          auction_year: auctionYear,
          price_usd: price,
        },
        null,
        2
      )
    ); */
    const resp = await axios({
      method: 'post',
      url: '/api/',
      data: {
        key,
        car_name: carName,
        highlights: formattedHighlights,
        info,
        auction_house: auctionHouse,
        auction_year: auctionYear,
        price_usd: price,
      },
    });
    return { data: { ...resp.data } };
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
