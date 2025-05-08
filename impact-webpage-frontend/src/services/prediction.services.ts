import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const predictionServices = {
  getLatestPrediction: () => instance.get(`${endpoint.PREDICTION}/latest`),
  getLatestDisplayPredictions: (modelType?: string) =>
    instance.get(`${endpoint.PREDICTION}/${modelType}`),
};

export default predictionServices;
