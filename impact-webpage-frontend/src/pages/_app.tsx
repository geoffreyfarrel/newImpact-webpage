import AppShell from "@/components/commons/AppShell/AppShell";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { NextIntlClientProvider } from "next-intl";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppContext, AppProps } from "next/app";
import { useRouter } from "next/router";
import LanguageProvider from "@/contexts/LanguageProvider";
import { getMessages } from "@/utils/getMessages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

App.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const locale = ctx.locale || "en";
  return {
    pageProps: {
      messages: await getMessages(locale),
    },
  };
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <AppShell>
            <WebSocketProvider>
              <LanguageProvider messages={pageProps.messages}>
                <Component {...pageProps} />
              </LanguageProvider>
            </WebSocketProvider>
          </AppShell>
        </NextThemesProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
