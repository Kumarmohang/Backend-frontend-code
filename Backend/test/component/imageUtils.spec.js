import { expect } from 'chai';
import {
  fixImageUrl,
  getThumbnailUrl,
  getImages,
} from '../../src/components/common/services/imageUtil';

const imageUrlHkEngineering =
  'https://www.hk-engineering.com/cars-extern-sales/image-thumb__31163__website/1101_98624424051170928092.JPG';
const thumbnailUrl =
  'https://driven.perpetualblock.io/api/static/images/carfolio/Ferrari/images/3a800877-6088-4308-a269-5f6308cf5386';
const staticUrl =
  '/api/static/images/carfolio/Ferrari/images/3a800877-6088-4308-a269-5f6308cf5386';
const MISSING_IMAGE_URL =
  'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg';
describe('Images util test cases', () => {
  describe('getImages test cases', () => {
    it('should return a array of single object if empty array is passed', () => {
      expect(getImages([]))
        .to.be.an('array')
        .to.eql([
          { original: MISSING_IMAGE_URL, thumbnail: MISSING_IMAGE_URL },
        ]);
    });
    it('should return a array of single object if nothing is passed', () => {
      expect(getImages())
        .to.be.an('array')
        .to.eql([
          { original: MISSING_IMAGE_URL, thumbnail: MISSING_IMAGE_URL },
        ]);
    });
    it('should return array of object having fixed urls keys original ,thumbail and description', () => {
      expect(getImages([{ original: '', thumbnail: '', description: '' }]))
        .to.be.an('array')
        .to.eql([
          {
            original: MISSING_IMAGE_URL,
            thumbnail: MISSING_IMAGE_URL,
            description: '',
          },
        ]);
    });
  });
  describe('fixImageUrl test cases', () => {
    it('should return exact  imageurl if image is accessed from others websites', () => {
      expect(fixImageUrl(imageUrlHkEngineering)).to.equal(
        imageUrlHkEngineering
      );
    });
    it('should return prepended baseUrl to imageurl ', () => {
      expect(fixImageUrl(staticUrl)).to.equal(
        `https://driven.perpetualblock.io${staticUrl}`
      );
    });
  });
  describe('getThumbnailUrl test cases', () => {
    it('should return fallback url if empty array is passed', () => {
      expect(getThumbnailUrl([])).to.equal(MISSING_IMAGE_URL);
    });
    it('should return a thumbnail url if an array of object is passed have both key value ', () => {
      expect(
        getThumbnailUrl([
          { original_url: imageUrlHkEngineering, thumbnail: thumbnailUrl },
        ])
      ).to.equal(thumbnailUrl);
    });
    it('should return a original url if an array of object is passedwith only original key ', () => {
      expect(
        getThumbnailUrl([{ original_url: imageUrlHkEngineering }])
      ).to.equal(imageUrlHkEngineering);
    });
  });
});
