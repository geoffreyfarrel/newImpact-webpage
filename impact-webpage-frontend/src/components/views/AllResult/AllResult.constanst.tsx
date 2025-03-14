import { SensorKey } from "@/types/Sensor";
import { useTranslations } from "next-intl";

const useGetSensors = () => {
  const t = useTranslations(); // ✅ Now inside a function!

  return [
    {
      key: "temperature",
      title: t("temperature_table_title"),
      description: t("measured_temperature"),
    },
    {
      key: "pH",
      title: t("acidity_table_title"),
      description: t("measured_acidity"),
    },
    {
      key: "conductivity",
      title: t("conductivity_table_title"),
      description: t("measured_conductivity"),
    },
    {
      key: "oxygen",
      title: t("oxygen_table_title"),
      description: t("measured_oxygen"),
    },
    {
      key: "ppm",
      title: t("ppm_table_title"),
      description: t("measured_ppm"),
    },
    {
      key: "pm25",
      title: t("measured_pm25"),
      description: t("measured_pm25"),
    },
  ] as { key: SensorKey; title: string; description: string }[];
};

export default useGetSensors;
