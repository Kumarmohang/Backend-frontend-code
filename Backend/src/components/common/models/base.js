import mongoose from 'mongoose';

import { Decimal128 } from 'bson';

const { Schema } = mongoose;

export const priceSchema = new Schema({
  sale_price_str: {
    type: String,
  },
  estimate_min: {
    type: Decimal128,
  },
  estimate_max: {
    type: Decimal128,
  },
  estimate_currency: {
    type: String,
  },
  estimate_price_str: { type: String },
  estimate_min_usd: { type: Decimal128 },
  estimate_max_usd: { type: Decimal128 },
  sale_price: { type: Decimal128 },
  sale_price_currency: { type: String },
  sale_price_usd: { type: Decimal128 },
  predicted_price_max: { type: Decimal128 },
  predicted_price_min: { type: Decimal128 },
  predicted_price_curr: { type: String },
});

export const identificationSchema = new Schema({
  chassis_no: {
    type: String,
  },
  vin: { type: String },
  identification_no: { type: String },
  serial_no: { type: String },
  registration_no: { type: String },
  engine_no: { type: String },
  gearbox_no: { type: String },
  body_no: { type: String },
  color: { type: String },
  interior_color: { type: String },
  identity_numbers: [String],
});

const imageSchema = new Schema({
  original_url: { type: String },
  source_page_url: { type: String },
  source: { type: String },
  description: { type: String },
  thumbnail: { type: String },
  date: { type: String },
  img_width: { type: Number },
  img_height: { type: Number },
  img_extension: { type: String },
  img_size_bytes: { type: Number },
  image_id: { type: String },
  type: { type: String },
  location_type: { type: String },
  Dir_path: { type: String },
  disk_url: { type: String },
  cloud_url: { type: String },
  is_active: { type: Boolean, default: true },
});

export const BaseSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  record_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  deleted_on: {
    type: Date,
  },
  source_url: {
    type: String,
  },
  sources_name: {
    type: String,
  },
  description: {
    type: [String],
  },
  key: {
    type: String,
    index: true,
  },
  tag_string: { type: String, index: true },
  images: Array(imageSchema),
});
// export const BaseSchema;
