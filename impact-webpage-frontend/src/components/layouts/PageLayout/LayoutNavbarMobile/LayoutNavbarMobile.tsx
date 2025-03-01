import { INavbarItems } from "@/types/Dashboard";
import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem, navbar } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch } from "react";
import { BiCross } from "react-icons/bi";
import { RxCross1, RxCross2 } from "react-icons/rx";

interface PropType {
  navbarItems: INavbarItems[];
  navbarIsOpen: boolean;
  setNavbarIsOpen: Dispatch<React.SetStateAction<boolean>>;
}

const LayoutNavbarMobile = (props: PropType) => {
  const { navbarItems, navbarIsOpen, setNavbarIsOpen } = props;
  const router = useRouter();
  return (
    <div
      className={cn(
        "fixed z-50 h-screen w-full translate-y-0 flex-col bg-white p-4 transition-all dark:bg-primary-900 lg:hidden",
        {
          "bg-white": navbarIsOpen,
        },
        {
          "translate-y-full": !navbarIsOpen,
        },
      )}
    >
      <div className="flex justify-end">
        <Button variant="light" onPress={() => setNavbarIsOpen(!navbarIsOpen)}>
          <RxCross2 className="text-2xl text-black dark:text-white" />
        </Button>
      </div>
      <div>
        {/* Menu Items */}
        <Listbox
          items={navbarItems}
          variant="solid"
          aria-label="Dashboard Menu"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 hover:!bg-teal-300/40", {
                "bg-teal-500 text-white": router.pathname === item.href,
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-labelledby={item.label}
              aria-describedby={item.label}
              as={Link}
              // onPress={() => router.push(item.href)}
              onPress={() => (window.location.href = item.href)}
              href={item.href}
            >
              <p className="">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>
    </div>
  );
};

export default LayoutNavbarMobile;
