import mongoose from 'mongoose';

const { Schema } = mongoose;

// Specific car instance schema
const similarCarsSchema = new Schema({
  title: { type: String },
  final_merge_uuid: { type: String },
  launch_year: { type: Number },
  production_year: { type: String },
  match_cars_id: { type: Array },
  match_cars_final_merge_uuid: { type: Array },
});

export default mongoose.model(
  'SimilarCars',
  similarCarsSchema,
  'similar_cars_6'
);
