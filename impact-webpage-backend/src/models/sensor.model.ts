import mongoose from "mongoose";
import * as yup from "yup";

const Schema = mongoose.Schema;

const SensorSchema = new Schema({
  createdAt: {
    type: Schema.Types.Date,
    required: true,
  },
  temperature: {
    type: Schema.Types.Number,
    required: true,
  },
  pH: {
    type: Schema.Types.Number,
    required: true,
  },
  conductivity: {
    type: Schema.Types.Number,
    required: true,
  },
  oxygen: {
    type: Schema.Types.Number,
    required: true,
  },
  ppm: {
    type: Schema.Types.Number,
    required: true,
  },
  pm25: {
    type: Schema.Types.Number,
    required: true,
  },
});

const SensorModel = mongoose.model("Sensor", SensorSchema);

export default SensorModel;
