import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdSunny } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

interface PropTypes {
  navbarIsOpen: boolean;
  setNavBarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopBar = (props: PropTypes) => {
  const { navbarIsOpen, setNavBarIsOpen } = props;
  const [isOpen, setIsOpen] = useState(false);
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
            <Dropdown isOpen={isOpen}>
              <DropdownTrigger>
                <Button
                  variant="light"
                  className="hover:!bg-transparent"
                  onPressStart={() => setIsOpen(!isOpen)}
                >
                  <Avatar src="/img/en-flag.png" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key={"en"}
                  startContent={
                    <Image
                      className="h-5 w-10"
                      alt="en-flag"
                      src="/img/en-flag.png"
                      width={100}
                      height={100}
                    />
                  }
                >
                  English(US)
                </DropdownItem>
                <DropdownItem
                  key={"cn"}
                  startContent={
                    <Image
                      className="h-5 w-10"
                      alt="cn-flag"
                      src="/img/cn-flag.png"
                      width={100}
                      height={100}
                    />
                  }
                >
                  中文(繁體)
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div>
            <Button
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
