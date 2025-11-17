"use client";
import React from "react";
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
  return (
    <aside className="bg-[#114c73] dark:bg-blue-800 w-[30%] md:w-[20%] h-screen transition-colors duration-300 fixed">
      <div className="flex justify-end p-4 text-white cursor-pointer">
        <PanelLeft />
      </div>

      <div>
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
      </div>

      <h1 className="text-white p-5">General</h1>

      <div className="flex justify-center items-center flex-col">
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
    </aside>
  );
};

export default SideBar;