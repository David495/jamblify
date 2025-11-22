"use client";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "../../public/jamblify-logo.png";
import Profile from "../../public/profile_icon.png";
import ThemeToggle from "../components/ThemeToggle";
import React, { useState } from "react";
import DashHome from "../components/DashHome";
import Aiwriter from "../components/Aiwriter";
import Assignment from "../components/Assignment";
import Simulator from "../components/Simulator";
import Courses from "../components/Courses";
import SettingsPage from "../components/Settings";
import Logout from "../components/Logout";
import Help from "../components/Help";
import SideBar from "../components/SideBar";
import Quiz from "../components/Quiz";

const Dashboard = () => {
  const [openPage, setOpenPage] = useState("DashHome");

  const renderPage = () => {
    if (openPage === "DashHome") return <DashHome />;
    if (openPage === "Aiwriter") return <Aiwriter />;
    if (openPage === "Assignment") return <Assignment />;
    if (openPage === "Simulator") return <Simulator />;
    if (openPage === "Courses") return <Courses />;
    if (openPage === "Settings") return <SettingsPage />;
    if (openPage === "Logout") return <Logout />;
    if (openPage === "Help") return <Help />;
    if (openPage === "Quiz") return <Quiz/>

    return <DashHome />;
  };

  return (
    <>
      <main className="flex flex-col h-screen">
      <header className="flex justify-between items-center w-full bg-[#175680] dark:bg-blue-900 p-5 fixed z-100 top-0 left-0 right-0 transition-colors duration-300 overflow-hidden">
        <Link href="/dashboard">
        <Image src={LogoImage} alt="Logo" height={50} />
        </Link>
        <div className="flex items-center gap-5">
          <Image src={Profile} alt="Profile Icon" height={20} />
          <ThemeToggle />
        </div>
      </header>

      <main className="transition-colors duration-300 flex justify-between items-center">
        <SideBar setOpenPage={setOpenPage}/>
        <div className=" p-5 w-full">
          {renderPage()}
        </div>
        </main>
        </main>
    </>
  );
};

export default Dashboard;