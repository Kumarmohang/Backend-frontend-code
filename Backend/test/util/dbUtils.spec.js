import { expect } from 'chai';
import mongoose from 'mongoose';
import { getDocumentById } from '../../src/components/common/services/dbUtils';
import { initMongoConnection, mongoClient } from '../../src/util/mongoClient';
import { Drivers } from '../../src/components/driver/model';
import { driverByIdResponse } from './dbUtilsRefResponse';
import { getDriverDetails } from '../../src/components/driver/service';
import config from '../../src/config';
import { mongo } from 'mongoose';

describe('dbUtils test cases', () => {
  let client;
  before('initialize database connection', async () => {
    client = await initMongoConnection(config.DB_URI);
  });
  after('closed mongo connection', () => {
    mongoose.connection.close(client);
  });
  describe('getDocumentById test case', () => {
    it('return a data response for a particular modelInstanse and id', async () => {
      const result = await getDocumentById(Drivers, '618ce397c82a4e2543a69074');
      const formattedResult = { data: getDriverDetails(result._doc) };
      expect(formattedResult).to.have.keys(['data']);
    });
    it('return a Bad request error if wrong id is querying', async () => {
      const result = await getDocumentById(Drivers, '618ce397c82a4e2543a69123');
      expect(result).to.equal(null);
    });
  });
});
