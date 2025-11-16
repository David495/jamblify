"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button className="bg-gray-200 p-2 rounded">
        <Sun />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 dark:bg-gray-800 p-2 rounded"
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeToggle;
