import { expect } from 'chai';
import moment from 'moment';
import {
  isEmpty,
  isString,
  numberWithCommas,
  getDate,
  getDateString,
} from '../../src/util';

const checkDate = new Date();
describe('Basic Util Test case', () => {
  describe('isEmpty function test case', () => {
    it('should return true when empty object is passed', () => {
      expect(isEmpty({})).to.equal(true);
    });
    it('should return true when null is passed', () => {
      expect(isEmpty(null)).to.equal(true);
    });
    it('should return false when obeject with property passed', () => {
      expect(isEmpty({ test: 1 })).to.equal(false);
    });
  });
  describe('isString function test case', () => {
    it('should return true when string is passed', () => {
      expect(isString('test')).to.equal(true);
    });
    it('should return true when empty string is passed', () => {
      expect(isString('')).to.equal(true);
    });
    it('should return false when number  is passed', () => {
      expect(isString(123)).to.equal(false);
    });
    it('should return false when object is passed', () => {
      expect(isString({})).to.equal(false);
    });
    it('should return false when null is passed', () => {
      expect(isString({})).to.equal(false);
    });
    it('should return false when nothing is passed', () => {
      expect(isString({})).to.equal(false);
    });
  });
  describe('numberWithCommas return number separated with comma after three digit', () => {
    it('if a number with more than three digits is passed than comma separated string after three digits is returned', () => {
      expect(numberWithCommas(123456)).to.equal('123,456');
    });
    it('numberWithComma convert num to string if a number with less than twoo digit is agrument', () => {
      expect(numberWithCommas(12)).to.equal('12');
    });
    it('should return same string if string is passed have alphanumeric ', () => {
      expect(numberWithCommas('shja12')).to.equal('shja12');
    });
    it('should return comma separated number string if string of number is passed', () => {
      expect(numberWithCommas('123456')).to.equal('123,456');
    });
  });
  describe('getDate returns formatted date', () => {
    it('getDate takes date object and convert it to Locale time format string', () => {
      expect(getDate('1995-12-25')).to.equal('12/24/1995');
    });
    it('should return invalid date if wrong date format passed as argument', () => {
      expect(getDate('25-12-1995')).to.equal('Invalid date');
    });
  });
  describe('getdatestring returns date object if date object is passed as argument and if string is passed than it returns utc formatted date', () => {
    it(`getDateString same date string if string is passed as arguments`, () => {
      expect(getDateString('1995-12-25')).to.equal('1995-12-25');
    });
    it('get DateString returns date object if date object is passed as argumnet', () => {
      expect(getDateString(checkDate)).to.equal(
        moment(checkDate).utc().format('L')
      );
    });
  });
});
