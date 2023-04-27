import { expect } from 'chai';
import {
  getEstimatedPriceStr,
  getFormattedPrice,
} from '../../src/components/common/services/priceUtil';

describe('Price util test cases', () => {
  describe('getEstimatedpriceStr test cases', () => {
    it('should return comma separated price and currency appended when price string pass as argument', () => {
      expect(
        getEstimatedPriceStr({
          estimate_price_str: '23782994',
          estimate_currency: '$',
          estimate_min: 129929,
          estimate_max: 36831888,
        })
      ).to.equal(`129,929 - 36,831,888 $`);
    });
    it('should return null if nothing is passed', () => {
      expect(getEstimatedPriceStr()).to.equal(null);
    });
  });
  describe('getEstimatedPriceStr test cases', () => {
    it('should return - if nothing is passed', () => {
      expect(getFormattedPrice()).to.equal('-');
    });
    it('should return - if empty object is passed', () => {
      expect(getFormattedPrice({})).to.equal('-');
    });
    it('should return formatted price string if price object is passed', () => {
      expect(
        getFormattedPrice({ sale_price: 2344522, sale_price_currency: '$' })
      ).to.equal('$ 2,344,522');
    });
  });
});
