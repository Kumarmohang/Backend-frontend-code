import mongoose from 'mongoose';

const { Schema } = mongoose;

const STATUS = {
  PENDING: 'Pending',
  INCORPORATED: 'Changes Incorporated',
  REJECTED: 'Changes Rejected',
};
// Specific car instance schema
const SpecificCarSchema = new Schema(
  {
    record: {
      type: Schema.Types.Mixed,
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.PENDING,
    },
    createdBy: {
      type: String,
    },
    // updatedBy: {
    //   type: String,
    // },
    recordType: { type: String },
    recordPath: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Suggestions', SpecificCarSchema, 'suggestions');
