import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import Charts from "@/components/ui/Charts";
import SensorCard from "@/components/ui/SensorCard";
import {
  convertToTaiwanTime,
  formatISOTimeWithDate,
} from "@/utils/timeFormatter";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Fragment, useState } from "react";
import useHome from "./useHome";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    colorPallete,
    latestChart,
    latestSensor,
    currentSensor,
    setCurrentSensor,
  } = useHome();

  return (
    <Fragment>
      <h1 className="m-4 text-center text-lg font-semibold md:text-2xl lg:text-3xl">
        Integrated Monitoring, Analysis, and Prediction of Environmental
        Sustainability: A Case Study of National Taipei University
      </h1>
      <PageTitle title="Home" />
      <Charts
        title="Latest Result"
        colorPallete={colorPallete}
        latestChart={latestChart}
        currentSensor={currentSensor}
        setCurrentSensor={setCurrentSensor}
      />
      <Card className="mb-4 p-2 dark:bg-primary-800">
        <CardHeader>Measured Result</CardHeader>
        <CardBody>
          <div>
            <SensorCard
              isTimeCard
              latestSensor={latestSensor}
              sensorName="Time"
              sensorType="createdAt"
            />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2 lg:grid-cols-3">
            <SensorCard
              latestSensor={latestSensor}
              sensorName="Temperature"
              sensorType="temperature"
            />
            <SensorCard
              isIndicator
              latestSensor={latestSensor}
              sensorName="pH"
              sensorType="pH"
            />
            <SensorCard
              isIndicator
              latestSensor={latestSensor}
              sensorName="Dissolved Oxygen"
              sensorType="oxygen"
            />
            <SensorCard
              latestSensor={latestSensor}
              sensorName="Conductivity"
              sensorType="conductivity"
            />
            <SensorCard
              isIndicator
              latestSensor={latestSensor}
              sensorName="Dissolved Solid"
              sensorType="ppm"
            />
            <SensorCard
              isIndicator
              latestSensor={latestSensor}
              sensorName="PM2.5"
              sensorType="pm25"
            />
          </div>
        </CardBody>
      </Card>
      <Charts
        title="Latest Result"
        colorPallete={colorPallete}
        latestChart={latestChart}
        currentSensor={currentSensor}
        setCurrentSensor={setCurrentSensor}
      />
      <Card className="mb-4 p-2 dark:bg-primary-800">
        <CardHeader>Predicted Result</CardHeader>
        <CardBody>
          <div>
            <SensorCard
              isTimeCard
              latestSensor={latestSensor}
              sensorName="Time"
              sensorType="createdAt"
            />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2 lg:grid-cols-3">
            <SensorCard
              latestSensor={latestSensor}
              sensorName="Temperature"
              sensorType="temperature"
            />
            <SensorCard
              isIndicator
              latestSensor={latestSensor}
              sensorName="pH"
              sensorType="pH"
            />
            <SensorCard
              isIndicator
              latestSensor={latestSensor}
              sensorName="Dissolved Oxygen"
              sensorType="oxygen"
            />
            <SensorCard
              latestSensor={latestSensor}
              sensorName="Conductivity"
              sensorType="conductivity"
            />
            <SensorCard
              isIndicator
              latestSensor={latestSensor}
              sensorName="Dissolved Solid"
              sensorType="ppm"
            />
            <SensorCard
              isIndicator
              latestSensor={latestSensor}
              sensorName="PM2.5"
              sensorType="pm25"
            />
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Home;
