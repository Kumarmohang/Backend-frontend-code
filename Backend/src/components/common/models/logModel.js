import mongoose from 'mongoose';

const { Schema } = mongoose;
const LogSchema = new Schema(
  {
    user: Schema.Types.Mixed,
    data: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Log', LogSchema);
