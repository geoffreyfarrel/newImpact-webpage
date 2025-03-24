import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const predictionServices = {
  getLatestPrediction: () => instance.get(`${endpoint.PREDICTION}/latest`),
  getLatestDisplayPredictions: () => instance.get(`${endpoint.PREDICTION}/all`),
};

export default predictionServices;
