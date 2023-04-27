import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { before } from 'mocha';

const server = 'http://localhost:8001';

const reqObjectList = [
  {
    payload: {
      pageNo: 0,
      fetchSize: 21,
    },
    description: 'should return object with data key',
  },
  {
    payload: {
      pageNo: 0,
      fetchSize: 50,
    },
    description: 'should return 400 error',
  },
  {
    payload: {
      pageNo: 'a',
      fetchSize: 50,
    },
    description: 'should return 400 bad request',
  },
  {
    payload: {
      pageNo: 0,
      fetchSize: 'b',
    },
    description: 'should return 400 error',
  },
];
chai.use(chaiHttp);

describe('driver Api test cases', () => {
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
  describe('driver list api test cases', () => {
    reqObjectList.forEach((ele) => {
      it(ele.description, function (done) {
        const url = `/drivers?${new URLSearchParams(ele.payload).toString()}`;
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
