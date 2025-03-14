import PageLayout from "@/components/layouts/PageLayout";
import Prediction from "@/components/views/Prediction";
import { getMessages } from "@/utils/getMessages";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: await getMessages(locale), // ✅ Load translations
    },
  };
}

const PredictionPage = () => {
  const t = useTranslations();
  return (
    <PageLayout title={t("prediction")}>
      <Prediction />
    </PageLayout>
  );
};

export default PredictionPage;
