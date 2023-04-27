import dotenv from 'dotenv';

dotenv.config();

export default {
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  PROJECT_NAME: process.env.PROJECT_NAME,
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT || '3000',
  HOST: process.env.HOST || 'localhost',
  SECRET: process.env.SECRET,
  HOST_NAME: process.env.HOST_NAME || 'localhost',
  PYTHON_PATH: process.env.PYTHON_PATH,
  VIN_SCRIPT_PATH: process.env.VIN_SCRIPT_PATH,
  GET_KEYSCRIPT_PATH: process.env.GET_KEYSCRIPT_PATH,
  HOST_ADDRESS: process.env.HOST_ADDRESS || 'http://localhost:8001',
  PROJECT_VERSION: process.env.PROJECT_VERSION || '0.1.0',
  SQLHOST: process.env.SQLHOST || 'localhost',
  SQLPORT: parseInt(process.env.SQLPORT, 10) || 1433,
  SQLPASSWORD: process.env.SQLPASSWORD || 'Shivam@1996',
  SQLUSER: process.env.SQLUSER || 'SA',
  SQLDATABASE: process.env.SQLDATABASE || 'VINDATA',
  VALUATION_API_URL: process.env.VALUATION_API_URL || 'http://localhost:5000',
};
