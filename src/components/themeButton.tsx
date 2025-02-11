"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";

export const ThemeButton = () => {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  // ensure that the themes are loaded
  useEffect(() => {
    setMounted(true);
  }, []);

  // if themes not loaded do not render the component
  if (!mounted) {
    return null;
  }

  const handleChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    setTheme("light");
  };

  return (
    <Button
      variant="outline"
      onClick={handleChangeTheme}
      size="icon"
      className="fixed right-10 bottom-20"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};
