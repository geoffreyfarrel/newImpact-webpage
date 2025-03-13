import PageLayout from "@/components/layouts/PageLayout";
import About from "@/components/views/About";
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
    <PageLayout title="About">
      <About messages={messages} />
    </PageLayout>
  );
};

export default ResultPage;
