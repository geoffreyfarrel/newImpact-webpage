import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { LanguageContext } from "@/contexts/LanguageProvider";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

interface PropTypes {
  navbarIsOpen: boolean;
  setNavBarIsOpen: Dispatch<SetStateAction<boolean>>;
}

const localeFlags: Record<string, string> = {
  en: "/img/en-flag.png",
  cn: "/img/cn-flag.png",
};

const localeNames: Record<string, string> = {
  en: "English (US)",
  cn: "中文(繁體)",
};

const TopBar = (props: PropTypes) => {
  const { navbarIsOpen, setNavBarIsOpen } = props;
  const languageContext = useContext(LanguageContext);
  const router = useRouter();
  const currentLocale = router.locale || "en";
  const [isOpen, setIsOpen] = useState(false);

  if (!languageContext) {
    return null;
  }

  const { changeLanguage } = languageContext;

  return (
    <div className="w-full border-b-2 bg-teal-500 dark:border-gray-600 dark:bg-background">
      <div className="flex flex-col items-center p-4 lg:flex-row lg:justify-between">
        <div className="mb-4 flex flex-1 justify-center lg:mb-0">
          <ul className="flex items-center rounded-3xl border-2 border-teal-500 bg-white dark:border-none">
            <li className="p-2">
              <Image
                alt="DMCL Logo"
                src="/img/dmcl-logo.png"
                width={300}
                height={300}
                priority
              />
            </li>
            <li className="p-2">
              <Image
                alt="NTPU Logo"
                src="/img/ntpu-logo.png"
                width={300}
                height={300}
                priority
              />
            </li>
            <li className="p-2">
              <Image
                alt="Honhui Logo"
                src="/img/honhui-logo.png"
                width={300}
                height={300}
                priority
              />
            </li>
          </ul>
        </div>
        <div className="flex flex-none items-start justify-between lg:justify-normal">
          <ThemeSwitcher />
          <div className="hidden h-8 w-px bg-gray-300 lg:flex"></div>
          <div
            className="flex"
            onMouseEnter={() => setIsOpen(!isOpen)}
            onMouseLeave={() => setIsOpen(!isOpen)}
          >
            <Dropdown
              isOpen={isOpen}
              classNames={{ content: "dark:bg-primary-800" }}
            >
              <DropdownTrigger>
                <Button
                  variant="light"
                  className="hover:!bg-transparent"
                  onPressStart={() => setIsOpen(!isOpen)}
                >
                  <Avatar
                    src={localeFlags[currentLocale]}
                    alt="current-language-flag"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {Object.entries(localeFlags).map(([locale, flag]) => (
                  <DropdownItem
                    key={locale}
                    startContent={
                      <Image
                        className="h-5 w-10"
                        alt={`${locale}-flag`}
                        src={flag}
                        width={100}
                        height={100}
                      />
                    }
                    onPress={() => changeLanguage(locale)}
                  >
                    {localeNames[locale]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div>
            <Button
              aria-label="Navigation Bar Toggle"
              className="lg:hidden"
              variant="light"
              onPress={() => setNavBarIsOpen(!navbarIsOpen)}
            >
              <RxHamburgerMenu className="text-2xl text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
