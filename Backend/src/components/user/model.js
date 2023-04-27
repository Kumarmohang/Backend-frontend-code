import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * @typedef User
 * @property {string} username
 * @property {string} hash
 * @property {string} salt
 * @property {string} _id
 */

const userSchema = new Schema({
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
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: String,
});
export default mongoose.model('User', userSchema);
