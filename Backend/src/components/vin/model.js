import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * @typedef vinSchema
 * @property {string} brand_name
 * @property {string} model_name
 * @property {string} model_year
 * @property {string} vin_token
 */

const vinSchema = new Schema({
  brand_name: {
    type: String,
  },
  model_name: {
    type: String,
  },
  model_year: {
    type: String,
  },
  vin_token: {
    type: String,
  },
});
export default mongoose.model('Vin', vinSchema, 'vin_database');
