import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode, useState } from "react";
import TopBar from "./TopBar";
import LayoutNavbar from "./LayoutNavbar";
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
        <LayoutNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex min-h-screen w-full flex-grow flex-col overflow-y-auto">
          <LayoutNavbarMobile
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
