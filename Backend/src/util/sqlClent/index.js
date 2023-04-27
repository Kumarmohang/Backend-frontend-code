import Mssql from 'mssql';
import Config from '../../config';

const config = {
  server: Config.SQLHOST,
  user: Config.SQLUSER,
  port: Config.SQLPORT,
  password: Config.SQLPASSWORD,
  database: Config.SQLDATABASE,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};
/**
 * @constructor sqlconnection
 * @description sql connectionn class
 * @property {function} createSqlConnection - create a sql connection
 * @property {client} sqlClient - sql client
 */
class SqlConnection {
  static sqlClient = null;

  /**
   * @description - create sql connection
   * @returns {void} - returns void
   */
  static async createSqlConnection() {
    try {
      this.sqlClient = await Mssql.connect(config);
      console.log('connected');
      /* await Mssql.query`EXEC [dbo].[spVinDecode] @v = N'ZHWUT4ZF0LLA14114', @year = 2020`;
      const resultArr = [];
      result1.recordset.forEach((columns) => {
        if (columns.GroupName != null && columns.value !== 'Not Applicable') {
          const dict = {
            name: columns?.Variable,
            value: columns?.Value,
          };
          resultArr.push(dict);
        }
      });
    } */
    } catch (err) {
      // await this.sqlClient.connect().then(() => {});
      /* this.sqlClient.query('select * from VINDATA.dbo.ABS', (err, res) => {
        console.log(res);
      }); */
      /* const result = await this.sqlClient.query('select * from wmi');
      console.log(result); */
      throw err;
    }
  }
}
/**
 * @description Initializes sqlconnection.

 * @returns {client} - returs client
 */
async function initSqlConnection() {
  try {
    const client = await SqlConnection.createSqlConnection();
    return client;
  } catch (error) {
    throw error;
  }
}

export { initSqlConnection };
