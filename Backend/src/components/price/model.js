import mongoose from 'mongoose';

import { BaseSchema } from '../common/models/base';

const { Schema } = mongoose;

// Specific car instance schema
const CarPricingSchema = new Schema({
  ...BaseSchema.obj,
  brand_name: { type: String },
  launch_year: { type: String },
  description: [{ type: String }],
  morecars_price: { type: Schema.Types.Mixed },
  carsdata_price: { type: Schema.Types.Mixed },
  k500_price: { type: Schema.Types.Mixed },
  conceptzcar_price: [{ type: Schema.Types.Mixed }],
  hagerty_price: { type: Schema.Types.Mixed },
});

export default mongoose.model('CarPricing', CarPricingSchema, 'car_pricing');
