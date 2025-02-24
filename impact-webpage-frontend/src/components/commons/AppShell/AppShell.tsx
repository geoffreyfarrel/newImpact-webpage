import { cn } from "@heroui/react";
import { Poppins } from "next/font/google";
import { ReactNode, useState } from "react";

interface PropTypes {
  children: ReactNode;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const AppShell = (props: PropTypes) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { children } = props;
  return <main className={cn(poppins.className)}>{children}</main>;
};

export default AppShell;
