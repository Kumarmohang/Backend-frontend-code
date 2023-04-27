import mongoose from 'mongoose';

import {
  BaseSchema,
  priceSchema,
  identificationSchema,
} from '../common/models/base';

const { Schema } = mongoose;

const AuctionSchema = new Schema({
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
  lot_no: { type: String },
  auction_name: { type: String },
  auction_link: { type: String },
  auction_house: { type: String },
  auction_location: { type: String },
  auction_date: { type: Date },
  is_sold: { type: Boolean },
  highlights: [{ type: String }],
  price: priceSchema.obj,
  identification: identificationSchema.obj,
  is_not_a_car: { type: Boolean },
});

export default mongoose.model('Auction', AuctionSchema, 'auction');
