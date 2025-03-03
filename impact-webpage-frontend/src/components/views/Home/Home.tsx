import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import Charts from "@/components/ui/Charts";
import SensorCard from "@/components/ui/SensorCard";
import {
  convertToTaiwanTime,
  formatISOTimeWithDate,
} from "@/utils/timeFormatter";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="m-4">
      <h1 className="m-4 text-center text-2xl lg:text-3xl">
        Integrated Monitoring, Analysis, and Prediction of Environmental
        Sustainability: A Case Study of National Taipei University
      </h1>
      <PageTitle title="Home" />
      <Charts title="Latest Result" />
      <Card className="mb-4 p-2 dark:bg-primary-800">
        <CardHeader>Measured Result</CardHeader>
        <CardBody>
          <div>
            <SensorCard
              sensorName="Time"
              sensorType="createdAt"
              isTimeCard
              isLoading={isLoading}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2 lg:grid-cols-3">
            <SensorCard
              sensorName="Temperature"
              sensorType="temperature"
              isLoading={isLoading}
            />
            <SensorCard
              sensorName="pH"
              sensorType="pH"
              isLoading={isLoading}
              isIndicator
            />
            <SensorCard
              sensorName="Dissolved Oxygen"
              sensorType="oxygen"
              isLoading={isLoading}
              isIndicator
            />
            <SensorCard
              sensorName="Conductivity"
              sensorType="conductivity"
              isLoading={isLoading}
            />
            <SensorCard
              sensorName="Dissolved Solid"
              sensorType="ppm"
              isLoading={isLoading}
              isIndicator
            />
            <SensorCard
              sensorName="PM2.5"
              sensorType="pm25"
              isLoading={isLoading}
              isIndicator
            />
          </div>
        </CardBody>
      </Card>
      <Charts title="Latest Result" />
      <Card className="mb-4 p-2 dark:bg-primary-800">
        <CardHeader>Predicted Result</CardHeader>
        <CardBody>
          <div>
            <SensorCard
              sensorName="Time"
              sensorType="createdAt"
              isTimeCard
              isLoading={isLoading}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2 lg:grid-cols-3">
            <SensorCard
              sensorName="Temperature"
              sensorType="temperature"
              isLoading={isLoading}
            />
            <SensorCard
              sensorName="pH"
              sensorType="pH"
              isLoading={isLoading}
              isIndicator
            />
            <SensorCard
              sensorName="Dissolved Oxygen"
              sensorType="oxygen"
              isLoading={isLoading}
              isIndicator
            />
            <SensorCard
              sensorName="Conductivity"
              sensorType="conductivity"
              isLoading={isLoading}
            />
            <SensorCard
              sensorName="Dissolved Solid"
              sensorType="ppm"
              isLoading={isLoading}
              isIndicator
            />
            <SensorCard
              sensorName="PM2.5"
              sensorType="pm25"
              isLoading={isLoading}
              isIndicator
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
