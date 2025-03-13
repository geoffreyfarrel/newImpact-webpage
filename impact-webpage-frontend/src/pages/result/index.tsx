import PageLayout from "@/components/layouts/PageLayout";
import LatestResult from "@/components/views/LatestResult";
import { getMessages } from "@/utils/getMessages";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: await getMessages(locale), // ✅ Load translations
    },
  };
}

const ResultPage = ({ messages }: { messages: Record<string, string> }) => {
  const t = useTranslations();
  return (
    <PageLayout title={t("latest_result")}>
      <LatestResult messages={messages} />
    </PageLayout>
  );
};

export default ResultPage;
