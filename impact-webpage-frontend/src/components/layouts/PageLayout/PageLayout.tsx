import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode, useState } from "react";
import TopBar from "./TopBar";
import LayoutNavbar from "./LayoutNavbar";
import { LAYOUTNAVBAR_ITEMS } from "./LayoutNavbar.constant";
import { Button, NavbarMenuToggle } from "@heroui/react";
import { FaHamburger } from "react-icons/fa";
import LayoutNavbarMobile from "./LayoutNavbarMobile";

interface PropTypes {
  children: ReactNode;
  title?: string;
}

const PageLayout = (props: PropTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const { children, title } = props;
  return (
    <Fragment>
      <PageHead title={title} />
      <div className="max-w-screen-3xl 3xl:container flex flex-row">
        <LayoutNavbar
          navbarItems={LAYOUTNAVBAR_ITEMS}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <div className="h-screen w-full overflow-y-auto">
          <LayoutNavbarMobile
            navbarItems={LAYOUTNAVBAR_ITEMS}
            navbarIsOpen={isOpen}
            setNavbarIsOpen={setIsOpen}
          />
          <TopBar navbarIsOpen={isOpen} setNavBarIsOpen={setIsOpen} />
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default PageLayout;
