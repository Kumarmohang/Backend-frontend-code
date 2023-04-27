import { expect } from 'chai';
import crypto from 'crypto';
import { genPassword, validPassword, issueJWT } from '../../src/util/authUtils';

const salt = crypto.randomBytes(32).toString('hex');
const hash = crypto
  .pbkdf2Sync('shivam', salt, 10000, 64, 'sha512')
  .toString('hex');
const user = {
  _id: 'agdhsahxBZ73484923',
  username: 'shivam.soni',
  password: 'shjcxbasnj',
};
describe('Authentication helper function test-cases', () => {
  describe('genPassword return a object containing salt and hash key and respective values', () => {
    it('genPassword output check for shivam@123', () => {
      expect(genPassword('shivam@123')).to.have.keys(['salt', 'hash']);
    });
    it('genPassword output check for empty string', () => {
      expect(genPassword('')).to.have.keys(['salt', 'hash']);
    });
  });
  describe('validPassword check if password is correct or not and return true false', () => {
    it('validPassword output check with manual created salt ,hash and password ', () => {
      expect(validPassword('shivam', hash, salt)).to.equal(true);
    });
    it('should return false if incorrect password is passed ', () => {
      expect(validPassword('shiva', hash, salt)).to.equal(false);
    });
  });
  describe('issueJWT generate a bearer token ', () => {
    it('issueJWT output check for a defined user', () => {
      expect(issueJWT(user)).to.have.keys(['token', 'expires']);
    });
  });
});
