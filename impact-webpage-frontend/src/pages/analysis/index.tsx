import PageLayout from "@/components/layouts/PageLayout";
import Analysis from "@/components/views/Analysis";
import { getMessages } from "@/utils/getMessages";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: await getMessages(locale), // ✅ Load translations
    },
  };
}

const AnalysisPage = ({ messages }: { messages: Record<string, string> }) => {
  return (
    <PageLayout title="Analysis">
      <Analysis messages={messages} />
    </PageLayout>
  );
};

export default AnalysisPage;
