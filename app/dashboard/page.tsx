"use client";
import { Home, Pen, Settings, LogOut, HandHelping, PanelLeft, ClipboardList, HelpCircle, BookOpen, Timer } from "lucide-react";
import LogoImage from "../../public/jamblify-logo.png";
import Image from "next/image";
import Profile from "../../public/profile_icon.png";
import ThemeToggle from "../components/ThemeToggle";
import React, { useState } from "react";
const Dashboard = () => {
  const [stopReload, setStopReload] = useState(false);

  const handleReload = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    setStopReload(true);
  }
  return (
    <>
      <main className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <header className="flex justify-between items-center bg-[#175680] dark:bg-blue-900 p-5 sticky top-0 left-0 right-0 transition-colors duration-300">
          <div>
            <Image src={LogoImage} alt="Logo Image" height={50} />
          </div>
          <div className="flex items-center gap-5">
            <Image src={Profile} alt="Profile icon" height={20} />
            <ThemeToggle />
          </div>
        </header>
        <aside className="bg-[#114c73] dark:bg-blue-800 w-[30%] md:w-[20%] h-screen transition-colors duration-300 fixed">
          <div className="flex justify-end p-4 text-white cursor-pointer ">
          <PanelLeft/>
          </div>
          <div>
          <button className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full" onClick={handleReload}>
            <Home/>
            <h1>Home</h1>
          </button>
          <button className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full" onClick={handleReload}>
            <Pen/>
            <h1>AI Writer</h1>
          </button>
          <button className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full" onClick={handleReload}>
            <ClipboardList/>
            <h1>Assignment</h1>
          </button>
          <button className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full" onClick={handleReload}>
            <Timer/>
            <h1>Simulator</h1>
          </button>
          <button className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full" onClick={handleReload}>
            <BookOpen/>
            <h1>Courses</h1>
          </button>
          <button className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full" onClick={handleReload}>
            <HelpCircle/>
            <h1>Quiz</h1>
          </button>
          </div>
          <h1 className="text-white p-5">General</h1>
          <div className="flex justify-center items-center flex-col">
{/* <button className="flex items-center  gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full" onClick={handleReload}>
            <Home/>
            <h1 className="p-2 text-white">Profile</h1>
          </button> */}
          <button className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full" onClick={handleReload}>
            <Settings/>
            <h1>Settings</h1>
          </button>
          <button className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full" onClick={handleReload}>
            <LogOut/>
            <h1>Logout</h1>
          </button>
          <button className="flex items-center p-4 gap-2 text-white cursor-pointer focus:bg-blue-700 hover:bg-blue-400 w-full" onClick={handleReload}>
            <HandHelping/>
            <h1>Help</h1>
          </button>
          </div>
        </aside>
      </main>
    </>
  );
};

export default Dashboard;
