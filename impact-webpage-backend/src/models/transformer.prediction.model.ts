import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TransformerPredictionSchema = new Schema({
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

const TransformerPredictionModel = mongoose.model(
  "TransformerPredictions",
  TransformerPredictionSchema,
  "transformer_prediction"
);

export default TransformerPredictionModel;
