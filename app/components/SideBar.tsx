"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Pen,
  Settings,
  HandHelping,
  BookOpen,
  Timer,
  PanelLeft,
  X,
} from "lucide-react";

interface MenuItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const mainMenu: MenuItem[] = [
  { title: "Home", href: "/dashboard", icon: <Home size={20} /> },
  { title: "AI Writer", href: "/dashboard/aiwriter", icon: <Pen size={20} /> },
  { title: "Simulator", href: "/dashboard/simulator", icon: <Timer size={20} /> },
  { title: "Courses", href: "/dashboard/courses", icon: <BookOpen size={20} /> },
];

const generalMenu: MenuItem[] = [
  { title: "Settings", href: "/dashboard/settings", icon: <Settings size={20} /> },
  { title: "Help", href: "/faqs", icon: <HandHelping size={20} /> },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="
          fixed top-6 left-20 z-200
          bg-blue-700 hover:bg-blue-600
          text-white p-2 rounded-md shadow-md
        "
      >
        <PanelLeft size={22} />
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-150"
          onClick={toggleSidebar}
        ></div>
      )}
      <aside
        className={`
          fixed top-0 left-0 z-200
          h-screen w-[260px]
          bg-[#114c73] dark:bg-blue-800
          text-white shadow-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-5 right-5 text-white"
        >
          <X size={20} />
        </button>

        <div className="pt-16 flex flex-col gap-2">
          {mainMenu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="
                flex items-center gap-4 px-6 py-3
                hover:bg-blue-600 transition-colors
              "
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}

          <h2 className="px-6 mt-4 text-sm font-bold opacity-70">GENERAL</h2>

          {generalMenu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="
                flex items-center gap-4 px-6 py-3
                hover:bg-blue-600 transition-colors
              "
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}

        </div>
      </aside>
    </>
  );
};

export default SideBar;