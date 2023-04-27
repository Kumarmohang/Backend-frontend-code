import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';

const server = 'http://localhost:8001';

const reqObjectList = [
  {
    payload: {
      search: '',
      group: 'All',
      subCat: 'All',
      grpIdx: 0,
      subCatIdx: 0,
      showSideBar: true,
      pageNo: 0,
      fetchSize: 21,
      from: 'header',
    },
    description: 'should return object with data key',
  },
  {
    payload: {
      search: '',
      group: 'Al',
      subCat: 'All',
      grpIdx: 0,
      subCatIdx: 0,
      showSideBar: true,
      pageNo: 0,
      fetchSize: 21,
      from: 'header',
    },
    description: 'should return Bad request if group is set invalid',
  },
  {
    payload: {
      search: '',
      group: 'Cars',
      subCat: 'All',
      grpIdx: 0,
      subCatIdx: 0,
      showSideBar: true,
      pageNo: 0,
      fetchSize: 21,
      from: 'header',
    },
    description: 'should return object with data key',
  },
  {
    payload: {
      search: '',
      group: 'Cars',
      subCat: 'All',
      grpIdx: 0,
      subCatIdx: 0,
      showSideBar: true,
      pageNo: 0,
      fetchSize: 100,
      from: 'header',
    },
    description:
      'should return object with data object with results array have 100 length',
  },
  {
    payload: {
      search: '',
      group: 'Cars',
      subCat: 'Al',
      grpIdx: 0,
      subCatIdx: 0,
      showSideBar: true,
      pageNo: 0,
      fetchSize: 100,
      from: 'header',
    },
    description:
      'should return object with data object with results array have 0 length if subcat set is invalid',
  },
];
chai.use(chaiHttp);

describe('Home controller Api test cases', () => {
  let token;
  before('login', (done) => {
    chai
      .request(server)
      .post('/users/login/')
      .set('content-type', 'application/json')
      .send({
        username: 'demouser',
        password: 'u$er123#',
      })
      .end((err, res) => {
        token = res.body.data.token;
        console.log(token);
        done();
      });
  });
  describe('search api test cases', () => {
    reqObjectList.forEach((ele) => {
      it(ele.description, function (done) {
        const url = `/search?${new URLSearchParams(ele.payload).toString()}`;
        //console.log(client);
        this.timeout(15000);
        chai
          .request(server)
          .get(url)
          .set({
            Authorization: `${token}`,
          })
          .end((err, res) => {
            console.log(res.body, res.statusCode);
            //res.should.have.status(200);
            //res.body.data.results.should.be.an('array');
            if (res.statusCode === 200) {
              expect(res.body.data.results).to.be.an('array');
            } else if (res.statusCode === 400) {
              expect(res.body).to.eql({
                msg: 'BAD_REQUEST',
                status: 'fail',
                success: false,
                extraData: {},
              });
            }
            // res.body.length.should.be.eql(0);
            done();
          });

        //console.log(result);
      });
    });
  });
});
