import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const datatableServices = {
  getAllDataTable: (params?: string) =>
    instance.get(`${endpoint.DATA_TABLE}?${params}`),
};

export default datatableServices;
