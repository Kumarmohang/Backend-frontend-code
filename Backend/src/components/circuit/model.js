import mongoose from 'mongoose';

import { BaseSchema } from '../common/models/base';

const { Schema } = mongoose;

const CircuitsSchema = new Schema({
  ...BaseSchema.obj,
  name: String,
  country_icon_url: String,
  circuit_info: [
    {
      key: String,
      value: String,
    },
  ],
  country: String,
  all_sources: [{ url: String, source_name: String }],
  aka: [String],
  timeline: [
    {
      timeline: String,
      event_name: String,
      circuit_length: String,
      circuit_name: String,
      images: String,
    },
  ],
  // thumbnail: String,
});
export default mongoose.model(
  'Circuits',
  CircuitsSchema,
  'circuits_new_schema'
);
