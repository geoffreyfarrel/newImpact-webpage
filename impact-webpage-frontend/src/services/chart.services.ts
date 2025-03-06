import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const chartServices = {
  getSelectedChart: (params?: string) =>
    instance.post(`${endpoint.CHART}?${params}`),
};

export default chartServices;
