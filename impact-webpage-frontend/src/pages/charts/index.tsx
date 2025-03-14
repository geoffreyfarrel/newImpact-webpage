import PageLayout from "@/components/layouts/PageLayout";
import SelectedCharts from "@/components/views/SelectedCharts";
import { getMessages } from "@/utils/getMessages";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: await getMessages(locale), // ✅ Load translations
    },
  };
}

const ResultPage = () => {
  return (
    <PageLayout title="Charts">
      <SelectedCharts />
    </PageLayout>
  );
};

export default ResultPage;
