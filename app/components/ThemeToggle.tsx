"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button className="p-2 rounded cursor-pointer">
        <Sun />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="text-white p-4 rounded cursor-pointer"
    >
      {theme === "dark" ? <Moon height={30}/> : <Sun height={30}/>}
    </button>
  );
};

export default ThemeToggle;