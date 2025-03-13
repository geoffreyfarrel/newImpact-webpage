import PageLayout from "@/components/layouts/PageLayout";
import ChartCard from "@/components/ui/Charts";
import SelectedCharts from "@/components/views/SelectedCharts";
import { getMessages } from "@/utils/getMessages";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: await getMessages(locale), // ✅ Load translations
    },
  };
}

const ResultPage = ({ messages }: { messages: Record<string, string> }) => {
  return (
    <PageLayout title="Charts">
      <SelectedCharts messages={messages} />
    </PageLayout>
  );
};

export default ResultPage;
