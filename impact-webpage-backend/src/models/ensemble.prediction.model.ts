import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EnsemblePredictionSchema = new Schema({
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

const EnsemblePredictionModel = mongoose.model(
  "EnsemblePredictions",
  EnsemblePredictionSchema,
  "ensemble_prediction"
);

export default EnsemblePredictionModel;
