import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import Charts from "@/components/ui/Charts";
import SensorCard from "@/components/ui/SensorCard";
import {
  convertToTaiwanTime,
  formatISOTimeWithDate,
} from "@/utils/timeFormatter";
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
      <div className="flex-col">
        <div className="flex w-full flex-col">
          <SensorCard
            sensorName="Time"
            sensorValue={formatISOTimeWithDate("2023-09-01 00:00:00")}
            isTimeCard
            isLoading={isLoading}
          />
          <div className="flex justify-center gap-4 lg:flex-row">
            <SensorCard
              sensorName="Temperature"
              sensorValue={25}
              isLoading={isLoading}
            />
            <SensorCard
              sensorName="pH"
              sensorValue={7}
              indicatorColor="blue"
              indicatorValue="Normal"
              isLoading={isLoading}
            />
            <SensorCard
              sensorName="oxygen"
              sensorValue={80}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex flex-row justify-center gap-4">
            <SensorCard
              sensorName="Conductivity"
              sensorValue={25}
              isLoading={isLoading}
            />
            <SensorCard
              sensorName="PPM"
              sensorValue={7}
              indicatorColor="blue"
              indicatorValue="Normal"
              isLoading={isLoading}
            />
            <SensorCard
              sensorName="PM2.5"
              sensorValue={80}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
