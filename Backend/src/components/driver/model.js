import mongoose from 'mongoose';

import { BaseSchema } from '../common/models/base';

const { Schema } = mongoose;

const BioSchema = new Schema(
  {
    birth_date: Date,
    death_date: Date,
    full_name: String,
    hometown: String,
    death_place: String,
  },
  { _id: false }
);

const RaceResultSchema = new Schema(
  {
    date: Date,
    circuit: String,
    circuit_key: String,
    race_name: String,
    race_key: String,
    position: String,
    pole_position: Boolean,
    fastest_lap: Boolean,
  },
  { _id: false }
);

const CareerDetailSchema = new Schema(
  {
    event_name: String,
    event_key: String,
    position: String,
    points: String,
    team: String,
    team_key: String,
    races: String,
    category: String,
    wins: String,
    engine: String,
    tyres: String,
    car: [Schema.Types.Mixed],
    podiums: String,
    year: String,
    race_results: [RaceResultSchema],
  },
  { _id: false }
);
const DriverSchema = new Schema({
  ...BaseSchema.obj,
  name: String,
  nationality: String,
  bio: BioSchema,
  career_details: [CareerDetailSchema],
  images: Array(String),
  driver_key: String,
});

export const Drivers = mongoose.model('drivers', DriverSchema, 'drivers');

const EventTeamDriversSchema = new Schema({
  ...BaseSchema.obj,
  event_name: { type: String },
  event_year: { type: String },
  team_name: [{ type: String }],
  event_main_key: { type: String },
  car_model: { type: String },
  brand_name: { type: String },
  driver_name: { type: String },
  driver_key: { type: String },
  is_kart: { type: Boolean },
});

export const EventTeamDrivers = mongoose.model(
  'event_team_drivers',
  EventTeamDriversSchema,
  'event_team_drivers'
);
