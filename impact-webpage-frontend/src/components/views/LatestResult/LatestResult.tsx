import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import Charts from "@/components/ui/Charts";
import DataTable from "@/components/ui/DataTable";
import SensorCard from "@/components/ui/SensorCard";
import {
  convertToTaiwanTime,
  formatISOTimeWithDate,
} from "@/utils/timeFormatter";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";

const sensorKeys = [
  "temperature",
  "pH",
  "conductivity",
  "oxygen",
  "ppm",
  "waterLevel",
  "pm25",
];

const LatestResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="m-4">
      <PageTitle title="Latest Result" />
      <DataTable
        sensorType="temperature"
        sensorDescription="Measured Water Temperature Value (&deg; C)"
        title="Measured Water Temperature Value"
      />
      <DataTable
        sensorType="pH"
        sensorDescription="Measured Acidity (pH)"
        title="Measured Water Acidity Value"
      />
      <DataTable
        sensorType="conductivity"
        sensorDescription="Measured Water Conductivity (S/m)"
        title="Measured Water Conductivity Value"
      />
      <DataTable
        sensorType="oxygen"
        sensorDescription="Measured Water Dissolved Oxygen (mg/L)"
        title="Measured Water Dissolved Oxygen Value"
      />
      <DataTable
        sensorType="ppm"
        sensorDescription="Measured Water Dissolved Solid (ppm)"
        title="Measured Water Dissolved Solid Value"
      />
      <DataTable
        sensorType="pm25"
        sensorDescription="Measured PM2.5 (Air Pollution) (&mu;g/m&sup3;)"
        title="Measured Water Dissolved Solid Value"
      />
    </div>
  );
};

export default LatestResult;
