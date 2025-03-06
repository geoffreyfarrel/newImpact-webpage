import PageLayout from "@/components/layouts/PageLayout";
import ChartCard from "@/components/ui/Charts";
import SelectedCharts from "@/components/views/SelectedCharts";

const ResultPage = () => {
  return (
    <PageLayout title="Charts">
      <SelectedCharts />
    </PageLayout>
  );
};

export default ResultPage;
