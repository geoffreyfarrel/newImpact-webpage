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
  }, []);

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
