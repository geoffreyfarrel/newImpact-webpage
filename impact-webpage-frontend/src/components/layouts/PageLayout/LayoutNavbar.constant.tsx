import { BsTable } from "react-icons/bs";
import { FaChartArea, FaIdCard } from "react-icons/fa";
import { GrDocumentTime } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { PiChartLineUp } from "react-icons/pi";

const LAYOUTNAVBAR_ITEMS = [
  {
    key: "home",
    label: "Home",
    href: "/",
    icon: <IoHome />,
  },
  {
    key: "latest-result",
    label: "Latest Result",
    href: "/result",
    icon: <GrDocumentTime />,
  },
  {
    key: "all-result",
    label: "All Result",
    href: "/all-result",
    icon: <BsTable />,
  },
  {
    key: "charts",
    label: "Charts",
    href: "/charts",
    icon: <FaChartArea />,
  },
  {
    key: "prediction",
    label: "Prediction",
    href: "/prediction",
    icon: <PiChartLineUp />,
  },
  {
    key: "about",
    label: "About",
    href: "/about",
    icon: <FaIdCard />,
  },
];

export { LAYOUTNAVBAR_ITEMS };
