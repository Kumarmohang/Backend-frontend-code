import mongoose from 'mongoose';

import { BaseSchema, identificationSchema } from '../common/models/base';

const { Schema } = mongoose;

// Specific car instance schema
const SpecificCarSchema = new Schema({
  ...BaseSchema.obj,
  specifications: { type: Schema.Types.Mixed },
  model_year: { type: String },
  description: [{ type: String }],
  highlights: [{ type: String }],
  serial_number: { type: String },
  timeline: [{ type: Schema.Types.Mixed }],
  brand_name: {
    type: String,
  },
  restoration: [{ type: Schema.Types.Mixed }],
  identification: identificationSchema,
  images_count: { type: Number },
  all_sources: [{ type: Schema.Types.Mixed }],
});

export default mongoose.model('SpecificCar', SpecificCarSchema, 'specific_car');
