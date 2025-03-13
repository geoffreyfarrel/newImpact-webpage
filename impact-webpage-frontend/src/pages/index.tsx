import PageLayout from "@/components/layouts/PageLayout";
import Home from "@/components/views/Home";
import { getMessages } from "@/utils/getMessages";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: await getMessages(locale), // ✅ Load translations
    },
  };
}

const HomePage = ({ messages }: { messages: Record<string, string> }) => {
  const t = useTranslations();
  return (
    <PageLayout title={t("home")}>
      <Home messages={messages} />
    </PageLayout>
  );
};

export default HomePage;
