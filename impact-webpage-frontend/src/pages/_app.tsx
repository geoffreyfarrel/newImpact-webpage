import AppShell from "@/components/commons/AppShell/AppShell";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
        </NextThemesProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
