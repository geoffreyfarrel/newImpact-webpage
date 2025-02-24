import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const chartServices = {
  getLatestChart: () => instance.get(`${endpoint.CHART}/latest`),
  getSelectedChart: (params?: string) =>
    instance.get(`${endpoint.CHART}?${params}`),
};

export default chartServices;
