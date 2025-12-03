"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  Pen,
  Settings,
  LogOut,
  HandHelping,
  PanelLeft,
  ClipboardList,
  HelpCircle,
  BookOpen,
  Timer,
} from "lucide-react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleIsopen = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex justify-between z-30">
        <aside
          className={`
            bg-[#114c73] dark:bg-blue-800
            h-screen left-0
            fixed top-12
            transition-all duration-300 z-100
            ${isOpen ? "w-[200px] md:max-w-[400px]" : "w-0"}
          `}
        >
          <button onClick={handleIsopen} className="dark:text-white cursor-pointer hover:scale-110 p-10">
            <PanelLeft/>
          </button>
          {isOpen && (
            <div className="">
              <Link href="/dashboard" className="flex items-center p-2 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full">
                <Home />
                <h1>Home</h1>
              </Link>

              <Link href="/dashboard/aiwriter" className="flex items-center p-2  gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full">
                <Pen />
                <h1>AI Writer</h1>
              </Link>

              <Link href="/dashboard/assignment"
                className="flex items-center p-2 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
              >
                <ClipboardList />
                <h1>Assignment</h1>
              </Link>

              <Link href="/dashboard/simulator"
                className="flex items-center p-2 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
              >
                <Timer />
                <h1>Simulator</h1>
              </Link>

              <Link href="/dashboard/courses"
                className="flex items-center p-2 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
              >
                <BookOpen />
                <h1>Courses</h1>
              </Link>

              <Link href="/dashboard/quiz"
                className="flex items-center p-2 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
              >
                <HelpCircle />
                <h1>Quiz</h1>
              </Link>

              <h1 className="text-white p-2 ">General</h1>

              <Link href="/dashboard/settings"
                className="flex items-center p-2 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
              >
                <Settings />
                <h1>Settings</h1>
              </Link>
              <Link href="/dashboard/logout"
                className="flex items-center p-2 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
              >
                <LogOut />
                <h1>Logout</h1>
              </Link>

              <Link href="/dashboard/help"
                className="flex items-center p-2 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
              >
                <HandHelping />
                <h1>Help</h1>
              </Link>
            </div> 
          )}
        </aside>
      </div>
    </>
  );
};

export default SideBar;