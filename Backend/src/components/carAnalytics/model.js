import mongoose from 'mongoose';

const { Schema } = mongoose;

// General information about car model schema
// const InnerSchema = new Schema({
//   Bugatti: [{ type: Object }],
//   McLaren: [{ type: Object }],
//   Porsche: [{ type: Object }],
//   Ferrari: [{ type: Object }],
//   'Mercedes-Benz': [{ type: Object }],
//   Lamborghini: [{ type: Object }],
//   Pagani: [{ type: Object }],
// });

// // General information about car model schema
// const OuterSchema = new Schema({
//   Capacity: InnerSchema.obj,
//   'Maximum Power': InnerSchema.obj,
// });

// Specific car instance schema
const carAnalyticsSchema = new Schema({
  car_analytics: { type: Schema.Types.Mixed },
});

export default mongoose.model(
  'CarAnalytics',
  carAnalyticsSchema,
  'car_analytics'
);
