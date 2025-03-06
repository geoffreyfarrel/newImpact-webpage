import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode, useState } from "react";
import TopBar from "./TopBar";
import LayoutNavbar from "./LayoutNavbar";
import { LAYOUTNAVBAR_ITEMS } from "./LayoutNavbar.constant";
import { Button, NavbarMenuToggle } from "@heroui/react";
import { FaHamburger } from "react-icons/fa";
import LayoutNavbarMobile from "./LayoutNavbarMobile";
import Footer from "./Footer";

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
        <div className="flex min-h-screen w-full flex-grow flex-col overflow-y-auto">
          <LayoutNavbarMobile
            navbarItems={LAYOUTNAVBAR_ITEMS}
            navbarIsOpen={isOpen}
            setNavbarIsOpen={setIsOpen}
          />
          <TopBar navbarIsOpen={isOpen} setNavBarIsOpen={setIsOpen} />
          <div className="flex-grow overflow-y-auto">
            <div className="m-6">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default PageLayout;
