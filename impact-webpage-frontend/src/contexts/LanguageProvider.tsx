import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";
import { createContext, ReactNode } from "react";

interface LanguageContextType {
  changeLanguage: (locale: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const LanguageProvider = ({
  children,
  messages,
}: {
  children: ReactNode;
  messages: Record<string, string>;
}) => {
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <LanguageContext.Provider value={{ changeLanguage }}>
      <NextIntlClientProvider locale={router.locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};

export { LanguageContext };
export default LanguageProvider;
