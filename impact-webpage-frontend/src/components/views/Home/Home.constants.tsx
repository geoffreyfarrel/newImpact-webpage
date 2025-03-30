import { useTranslations } from "next-intl";

const useHomeConstants = () => {
  const t = useTranslations();
  const DROPDOWN_CONSTANTS = [
    { key: "temperature", label: t("temperature") },
    { key: "pH", label: t("pH") },
    { key: "conductivity", label: t("conductivity") },
    { key: "oxygen", label: t("oxygen") },
    { key: "ppm", label: t("ppm") },
    { key: "pm25", label: t("pm25") },
  ];

  return DROPDOWN_CONSTANTS;
};

export default useHomeConstants;
