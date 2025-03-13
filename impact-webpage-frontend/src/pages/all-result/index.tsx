import PageLayout from "@/components/layouts/PageLayout";
import AllResult from "@/components/views/AllResult";
import { getMessages } from "@/utils/getMessages";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: await getMessages(locale), // ✅ Load translations
    },
  };
}

const AllResultPage = ({ messages }: { messages: Record<string, string> }) => {
  return (
    <PageLayout title="All Result">
      <AllResult messages={messages} />
    </PageLayout>
  );
};

export default AllResultPage;
