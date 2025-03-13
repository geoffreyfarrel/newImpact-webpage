import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before rendering (prevents SSR mismatches)
  useEffect(() => {
    setMounted(true);

    const checkTimeAndUpdateTheme = () => {
      const hour = new Date().getHours();
      // console.log("Checking time:", hour);

      if (hour >= 18 || hour < 6) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    // Run immediately
    checkTimeAndUpdateTheme();

    // Auto-check every minute
    const interval = setInterval(() => {
      checkTimeAndUpdateTheme();
    }, 1000); // Check every 60 seconds

    return () => clearInterval(interval); // Cleanup when component unmounts
  }, [setTheme]);

  if (!mounted) return null; // Avoid rendering until mounted

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="light"
      className="hover:!bg-transparent focus:bg-transparent"
      onPress={toggleTheme}
    >
      {theme === "dark" ? (
        <FaMoon className="text-2xl" />
      ) : (
        <MdSunny className="text-2xl text-white" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
