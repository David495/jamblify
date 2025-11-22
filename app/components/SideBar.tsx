"use client";
import React, { useState } from "react";
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

const SideBar = ({ setOpenPage }: { setOpenPage: (page: string) => void }) => {
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
            fixed top-20
            transition-all duration-300
            ${isOpen ? "w-[200px] md:max-w-[400px]" : "w-0"}
          `}
        >
          <button onClick={handleIsopen} className="dark:text-white cursor-pointer hover:scale-110 p-5">
            <PanelLeft/>
          </button>
          {isOpen && (
            <div className="">
              <button
                className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
                onClick={() => setOpenPage("DashHome")}
              >
                <Home />
                <h1>Home</h1>
              </button>

              <button
                className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
                onClick={() => setOpenPage("Aiwriter")}
              >
                <Pen />
                <h1>AI Writer</h1>
              </button>

              <button
                className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
                onClick={() => setOpenPage("Assignment")}
              >
                <ClipboardList />
                <h1>Assignment</h1>
              </button>

              <button
                className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
                onClick={() => setOpenPage("Simulator")}
              >
                <Timer />
                <h1>Simulator</h1>
              </button>

              <button
                className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
                onClick={() => setOpenPage("Courses")}
              >
                <BookOpen />
                <h1>Courses</h1>
              </button>

              <button
                className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
                onClick={() => setOpenPage("Quiz")}
              >
                <HelpCircle />
                <h1>Quiz</h1>
              </button>

              <h1 className="text-white p-5">General</h1>

              <button
                className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
                onClick={() => setOpenPage("Settings")}
              >
                <Settings />
                <h1>Settings</h1>
              </button>

              <button
                className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
                onClick={() => setOpenPage("Logout")}
              >
                <LogOut />
                <h1>Logout</h1>
              </button>

              <button
                className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full"
                onClick={() => setOpenPage("Help")}
              >
                <HandHelping />
                <h1>Help</h1>
              </button>
            </div>
          )}
        </aside>
      </div>
    </>
  );
};

export default SideBar;