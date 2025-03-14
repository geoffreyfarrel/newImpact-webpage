import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

const ThemeSwitcher = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkTimeAndUpdateTheme = () => {
      if (manualOverride) {
        // console.log("Skipping auto-switch due to manual override.");
        return; // ✅ Skip auto-switching if user manually changed the theme
      }

      const hour = new Date().getHours();
      // console.log(
      //   `🕒 Checking time: ${hour}, Theme: ${resolvedTheme}, Manual Override: ${manualOverride}`,
      // );

      if ((hour >= 18 || hour < 6) && resolvedTheme !== "dark") {
        setTheme("dark");
      } else if (hour >= 6 && hour < 18 && resolvedTheme !== "light") {
        setTheme("light");
      }
    };

    checkTimeAndUpdateTheme(); // Run immediately

    // 🔥 Debug: Check every 10 seconds instead of every hour
    const interval = setInterval(checkTimeAndUpdateTheme, 10 * 1000);

    return () => clearInterval(interval); // Cleanup
  }, [setTheme, resolvedTheme, manualOverride]);

  if (!mounted || !resolvedTheme) return null; // Prevent SSR mismatch

  const toggleTheme = () => {
    setManualOverride(true);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

    // 🔥 Debug: Reset override after 15 minutes
    setTimeout(
      () => {
        setManualOverride(false);
      },
      15 * 60 * 1000,
    );
  };

  return (
    <Button
      variant="light"
      className="hover:!bg-transparent focus:bg-transparent"
      onPress={toggleTheme}
    >
      {resolvedTheme === "dark" ? (
        <FaMoon className="text-2xl" />
      ) : (
        <MdSunny className="text-2xl text-white" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
