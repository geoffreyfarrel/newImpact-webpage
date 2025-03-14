import PageTitle from "@/components/layouts/PageLayout/PageTitle";
import { useTranslations } from "next-intl";

const Prediction = () => {
  const t = useTranslations();
  return <PageTitle title={t("prediction")} />;
};

export default Prediction;
