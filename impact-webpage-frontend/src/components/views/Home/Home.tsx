import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import SensorCard from "@/components/ui/SensorCard";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Fragment } from "react";
import useHome from "./useHome";
import ChartCard from "@/components/ui/Charts";
import { useTranslations } from "next-intl";
import useHomeConstants from "./Home.constants";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home = ({ messages }: { messages: Record<string, string> }) => {
  const t = useTranslations();
  const {
    colorPallete,
    latestChart,
    latestSensor,
    currentSensor,
    setCurrentSensor,

    dataLatestPrediction,
  } = useHome();

  const DROPDOWN_CONSTANTS = useHomeConstants();

  // console.log(latestChart);

  return (
    <Fragment>
      <h1 className="m-4 whitespace-pre-line text-center text-lg font-semibold md:text-2xl lg:text-3xl">
        {t("project_title")}
      </h1>
      <PageTitle title={t("home")} />
      <div>
        <ChartCard
          title={t("chart_title")}
          colorPallete={colorPallete}
          latestChart={latestChart}
          currentSensor={currentSensor}
          setCurrentSensor={setCurrentSensor}
          showDateRange
          showDropdown
          dropdownOptions={DROPDOWN_CONSTANTS}
        />
        <Card className="mb-4 p-2 dark:bg-primary-800">
          <CardHeader>{t("measured_result")}</CardHeader>
          <CardBody>
            <div>
              <SensorCard
                isTimeCard
                latestSensor={latestSensor}
                sensorName={t("time")}
                sensorType="createdAt"
              />
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2 lg:grid-cols-3">
              <SensorCard
                latestSensor={latestSensor}
                sensorName={t("temperature")}
                sensorType="temperature"
              />
              <SensorCard
                isIndicator
                latestSensor={latestSensor}
                sensorName={t("pH")}
                sensorType="pH"
              />
              <SensorCard
                isIndicator
                latestSensor={latestSensor}
                sensorName={t("oxygen")}
                sensorType="oxygen"
              />
              <SensorCard
                latestSensor={latestSensor}
                sensorName={t("conductivity")}
                sensorType="conductivity"
              />
              <SensorCard
                isIndicator
                latestSensor={latestSensor}
                sensorName={t("ppm")}
                sensorType="ppm"
              />
              <SensorCard
                isIndicator
                latestSensor={latestSensor}
                sensorName={t("pm25")}
                sensorType="pm25"
              />
            </div>
          </CardBody>
        </Card>
      </div>
      <div>
        {/* <ChartCard
          title={t("predicted_chart")}
          colorPallete={colorPallete}
          latestChart={latestChart}
          currentSensor={currentSensor}
          setCurrentSensor={setCurrentSensor}
        /> */}
        <Card className="mb-4 p-2 dark:bg-primary-800">
          <CardHeader>{t("predicted_result")}</CardHeader>
          <CardBody>
            <div>
              <SensorCard
                isTimeCard
                latestSensor={dataLatestPrediction}
                sensorName={t("time")}
                sensorType="createdAt"
              />
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2 lg:grid-cols-3">
              <SensorCard
                latestSensor={dataLatestPrediction}
                sensorName={t("temperature")}
                sensorType="temperature"
              />
              <SensorCard
                isIndicator
                latestSensor={dataLatestPrediction}
                sensorName={t("pH")}
                sensorType="pH"
              />
              <SensorCard
                isIndicator
                latestSensor={dataLatestPrediction}
                sensorName={t("oxygen")}
                sensorType="oxygen"
              />
              <SensorCard
                latestSensor={dataLatestPrediction}
                sensorName={t("conductivity")}
                sensorType="conductivity"
              />
              <SensorCard
                isIndicator
                latestSensor={dataLatestPrediction}
                sensorName={t("ppm")}
                sensorType="ppm"
              />
              <SensorCard
                isIndicator
                latestSensor={dataLatestPrediction}
                sensorName={t("pm25")}
                sensorType="pm25"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </Fragment>
  );
};

export default Home;
