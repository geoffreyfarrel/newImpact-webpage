import { BsTable } from "react-icons/bs";
import { FaChartArea, FaIdCard } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import { GrDocumentTime } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { PiChartLineUp } from "react-icons/pi";
import { useTranslations } from "next-intl";

const useLayoutNavbarItems = () => {
  const t = useTranslations(""); // ✅ Define translations inside a function

  return [
    {
      key: "home",
      label: t("home"),
      href: "/",
      icon: <IoHome />,
    },
    {
      key: "latest-result",
      label: t("latest_result"),
      href: "/result",
      icon: <GrDocumentTime />,
    },
    {
      key: "all-result",
      label: t("all_result"),
      href: "/all-result",
      icon: <BsTable />,
    },
    {
      key: "charts",
      label: t("charts"),
      href: "/charts",
      icon: <FaChartArea />,
    },
    {
      key: "analysis",
      label: t("analysis"),
      href: "/analysis",
      icon: <ImLab />,
    },
    {
      key: "prediction",
      label: t("prediction"),
      href: "/prediction",
      icon: <PiChartLineUp />,
    },
    {
      key: "about",
      label: t("about"),
      href: "/about",
      icon: <FaIdCard />,
    },
  ];
};

export { useLayoutNavbarItems };
