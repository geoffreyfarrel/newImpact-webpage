import mongoose from "mongoose";
import * as yup from "yup";

const Schema = mongoose.Schema;

export const searchValidateSchema = yup.object({
  startDate: yup
    .string()
    .required()
    .test(
      "valid-startDate",
      "Must enter valid date format (YYYY-MM-DD)",
      (value) => {
        if (!value) return false;
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(value);
      }
    ),
  endDate: yup
    .string()
    .required()
    .test(
      "valid-endDate",
      "Must enter valid date format (YYYY-MM-DD)",
      (value) => {
        if (!value) return false;
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(value);
      }
    ),
});

const SensorSchema = new Schema({
  createdAt: {
    type: Schema.Types.Date,
    reqired: true,
  },
  temperature: {
    type: Schema.Types.Number,
    require: true,
  },
  pH: {
    type: Schema.Types.Number,
    require: true,
  },
  conductivity: {
    type: Schema.Types.Number,
    require: true,
  },
  oxygen: {
    type: Schema.Types.Number,
    require: true,
  },
  ppm: {
    type: Schema.Types.Number,
    require: true,
  },
  pm25: {
    type: Schema.Types.Number,
    require: true,
  },
});

const SensorModel = mongoose.model("Sensor", SensorSchema);

export default SensorModel;
