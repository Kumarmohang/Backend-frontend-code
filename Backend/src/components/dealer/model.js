import mongoose from 'mongoose';

import {
  BaseSchema,
  priceSchema,
  identificationSchema,
} from '../common/models/base';

const { Schema } = mongoose;

const dealerIdentificationSchema = new Schema({
  ...identificationSchema.obj,
  odometer_reading: { type: String },
  first_registration_date: { type: String },
  previous_owner: { type: String },
});

const DealerSchema = new Schema({
  ...BaseSchema.obj,
  url: {
    type: String,
  },
  record_id: {
    type: String,
  },
  brand_name: {
    type: String,
  },
  model_year: {
    type: Number,
  },
  is_sold: { type: Boolean },
  highlights: [{ type: String }],
  price: priceSchema.obj,
  identification: dealerIdentificationSchema.obj,
  specification: Schema.Types.Mixed,
  source_name: String,
});

export default mongoose.model('Dealer', DealerSchema);
export const CarsForSell = mongoose.model(
  'CarsForSell',
  DealerSchema,
  'dealer_cars'
);
