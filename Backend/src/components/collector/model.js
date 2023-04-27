import mongoose from 'mongoose';

import { BaseSchema } from '../common/models/base';

const { Schema } = mongoose;

const CollectorSchema = new Schema({
  ...BaseSchema.obj,
  aka: {
    type: String,
  },
  no_of_cars_owned: {
    type: String,
  },
  cars_in_collection: {
    type: String,
  },
  collection_cost: {
    type: String,
  },
  collector_image: [
    {
      original: {
        type: String,
      },
      thumbnail: {
        type: String,
      },
    },
  ],
  country: {
    type: String,
  },
  name: {
    type: String,
  },
  influencer_type: String,
});

export default mongoose.model('collector', CollectorSchema, 'collector_raw');
