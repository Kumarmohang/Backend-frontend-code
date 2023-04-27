import mongoose from 'mongoose';

import { BaseSchema } from '../common/models/base';

const { Schema } = mongoose;

// Car specification schema
const specificationSchema = new Schema({
  Engine: { type: Schema.Types.Mixed },
  Chassis: { type: Schema.Types.Mixed },
  Dimensions: { type: Schema.Types.Mixed },
  Performance: { type: Schema.Types.Mixed },
  // 'Fuel consumption': { type: Schema.Types.Mixed },
  // 'Fuel consumption and emissions': { type: Schema.Types.Mixed },
  // 'Co2 emissions': { type: Schema.Types.Mixed },
  // 'Transmission and Performance': { type: Schema.Types.Mixed },
  // 'General Data': { type: Schema.Types.Mixed },
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
  thumbnails: [{ type: String }],
  specifications: specificationSchema.obj,
  launch_year: { type: String },
  synonyms: { type: String },
  car_type: { type: String },
  k500_price: [{ type: Schema.Types.Mixed }],
  general_info: generalInformationSchema.obj,
  year_wise_specifications: { type: Schema.Types.Mixed },
  url: { type: String },
  is_racing: { type: Boolean },
  is_fewoffs: { type: Boolean },
  is_concept: { type: Boolean },
  body_style: { type: String },
  model: { type: String },
  is_upcoming: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  decade: { type: String },
  roof_top: { type: String },
  no_of_seats: { type: Number },
  segment: { type: String },
  category: { type: String },
  is_f1: { type: Boolean },
  series: { type: String },
  final_merge_uuid: { type: String },
});

export default mongoose.model('Car', CarSchema, 'cars');
