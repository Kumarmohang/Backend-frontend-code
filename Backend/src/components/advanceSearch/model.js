import mongoose from 'mongoose';

import { BaseSchema } from '../common/models/base';

const { Schema } = mongoose;

// Car specification schema
const specificationSchema = new Schema({
  Engine: { type: Schema.Types.Mixed },
  Chassis: { type: Schema.Types.Mixed },
  Dimensions: { type: Schema.Types.Mixed },
  Performance: { type: Schema.Types.Mixed },
  Features: { type: Schema.Types.Mixed },
  'Energy Efficiency': { type: Schema.Types.Mixed },
  Body: { type: Schema.Types.Mixed },
  Gearbox: { type: Schema.Types.Mixed },
});

// General information about car model schema
const generalInformationSchema = new Schema({
  production_count: { type: String },
  car_designers: [{ type: String }],
  production_years: [{ type: String }],
});

const CarSchema = new Schema({
  ...BaseSchema.obj,
  brand_name: {
    type: String,
  },
  series: { type: String },
  thumbnails: [{ type: String }],
  specifications: specificationSchema.obj,
  launch_year: { type: String },
  year_wise_specifications: { type: Schema.Types.Mixed },
  synonyms: { type: String },
  car_type: { type: String },
  general_info: generalInformationSchema.obj,
  url: { type: String },
  body_style: { type: String },
  model: { type: String },
  roof_top: { type: String },
  no_of_seats: { type: Number },
  category: { type: String },
  gear_type: { type: String },
  max_power: { type: String },
  engine_type: { type: String },
  num_doors: { type: Number },
  max_power_from: { type: String },
  max_power_to: { type: String },
  production_year: { type: String },
});

export default mongoose.model('CarYear', CarSchema, 'car_year_wise');
