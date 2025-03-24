import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PredictionFrontendSchema = new Schema({
  timestamp: {
    type: Schema.Types.String,
    required: true,
  },
  predictions: {
    temperature: {
      type: [Number],
      required: true,
    },
    pH: {
      type: [Number],
      required: true,
    },
    conductivity: {
      type: [Number],
      required: true,
    },
    oxygen: {
      type: [Number],
      required: true,
    },
    ppm: {
      type: [Number],
      required: true,
    },
    pm25: {
      type: [Number],
      required: true,
    },
  },
});

const PredictionFrontendModel = mongoose.model(
  "PredictionsForFrontEnd",
  PredictionFrontendSchema,
  "predictions_for_frontend"
);

export default PredictionFrontendModel;
