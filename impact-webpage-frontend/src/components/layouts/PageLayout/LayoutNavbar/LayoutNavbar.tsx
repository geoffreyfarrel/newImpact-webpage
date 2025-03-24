import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useLayoutNavbarItems } from "../LayoutNavbar.constant";

interface PropTypes {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LayoutNavbar = (props: PropTypes) => {
  const navbarItems = useLayoutNavbarItems();
  const { isOpen, setIsOpen } = props;
  const router = useRouter();

  return (
    <div
      className={cn(
        "relative z-50 hidden h-auto min-h-screen flex-col justify-between bg-teal-500 px-4 py-6 transition-all dark:bg-background lg:flex lg:flex-grow", // Hidden on smaller screens, visible on lg and above
        {
          "w-full max-w-[300px]": isOpen, // Full width when isOpen is true
          "w-[175px] max-w-[175px]": !isOpen, // Half width when isOpen is false
        },
      )}
    >
      <div>
        {/* Logo Section */}
        <div
          className={cn(
            "flex w-full pb-4 text-center transition-all",
            { "justify-center": !isOpen },
            { "justify-start": isOpen },
          )}
        >
          <Link className="flex items-center gap-4" href="/">
            <Image
              src={"/img/logo-only-white.svg"}
              alt="logo"
              width={isOpen ? 180 : 90} // Resize logo dynamically
              height={isOpen ? 60 : 30} // Resize height dynamically
              className="w-16 transition-all"
              onClick={() => router.push("/")}
            />
            {isOpen && (
              <h1 className="truncate text-xl font-semibold text-white">
                IMPACT: NTPU
              </h1>
            )}
          </Link>
        </div>

        {/* Menu Items */}
        <Listbox
          items={navbarItems}
          variant="solid"
          aria-label="Dashboard Menu"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn(
                "my-1 h-12 text-white hover:!bg-teal-800/50 hover:!text-white",
                {
                  "text-2xl": isOpen, // Larger font size when open
                  "text-base": !isOpen, // Smaller font size when closed
                  "bg-white text-teal-600 dark:bg-primary-700 dark:text-white":
                    router.pathname === item.href,
                },
              )}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              onPress={() => router.push(item.href)}
              as={Link}
              href={item.href}
            >
              <p
                className={cn("transition-all", {
                  "text-base": isOpen,
                  "truncate text-sm": !isOpen, // Truncate text for small width
                })}
              >
                {item.label}
              </p>
            </ListboxItem>
          )}
        </Listbox>

        {/* Button to Toggle Sidebar */}
        <div className="flex justify-center">
          <Button
            className="flex h-10 w-10 rounded-xl bg-white dark:bg-primary-700"
            onPress={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <MdKeyboardArrowLeft className="text-3xl text-teal-600 dark:text-white" />
            ) : (
              <MdKeyboardArrowRight className="text-3xl text-teal-600 dark:text-white" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LayoutNavbar;
