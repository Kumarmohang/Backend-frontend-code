import mongoose from 'mongoose';

import { BaseSchema } from '../common/models/base';

const { Schema } = mongoose;

const ClubSchema = new Schema({
  ...BaseSchema.obj,
  website: {
    type: String,
  },
  contact: {
    type: String,
  },
  instagram_link: {
    type: String,
  },
  instagram_follower: {
    type: String,
  },
  instagram_posts: {
    type: String,
  },
  events: {},
  logo: {
    type: String,
  },
});
export default mongoose.model('Club', ClubSchema, 'clubs');
