import mongoose from 'mongoose';

import { BaseSchema } from '../common/models/base';

const { Schema } = mongoose;

// news schema
const NewsSchema = new Schema({
  ...BaseSchema.obj,
  summary: { type: String },
  thumbnail: { type: String },
  date: { type: String },
});

// social media schema
const SocialMediaSchema = new Schema({
  ...BaseSchema.obj,
  link: { type: String },
  count: { type: String },
  type: { type: String },
});

export const News = mongoose.model('News', NewsSchema, 'news');

export const SocialMedia = mongoose.model(
  'SocialMedia',
  SocialMediaSchema,
  'social_media'
);
