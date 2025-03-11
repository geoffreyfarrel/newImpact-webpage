import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const chartServices = {
  getSelectedChart: (params?: string) =>
    instance.get(`${endpoint.CHART}?${params}`),
  getBoxPlotChart: () => instance.get(endpoint.BOX_PLOT),
};

export default chartServices;
