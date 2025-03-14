import PageLayout from "@/components/layouts/PageLayout";
import AllResult from "@/components/views/AllResult";
import { getMessages } from "@/utils/getMessages";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: await getMessages(locale), // ✅ Load translations
    },
  };
}

const AllResultPage = () => {
  const t = useTranslations();
  return (
    <PageLayout title={t("all_result")}>
      <AllResult />
    </PageLayout>
  );
};

export default AllResultPage;
