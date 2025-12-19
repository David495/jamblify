"use client";
import React, { useState } from "react";
import DashHome from "../components/DashHome";
import { Aiwriter } from "../components/Aiwriter";
import Assignment from "../components/Assignment";
import Simulator from "../components/Simulator";
import Courses from "../components/Courses";
import SettingsPage from "../components/Settings";
import DashHeader from "../components/DashboardHeader";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  const [openPage] = useState("DashHome");
  

  const renderPage = () => {
    if (openPage === "DashHome") return <DashHome />;
    if (openPage === "Aiwriter") return <Aiwriter />;
    if (openPage === "Assignment") return <Assignment />;
    if (openPage === "Simulator") return <Simulator />;
    if (openPage === "Courses") return <Courses />;
    if (openPage === "Settings") return <SettingsPage />;

    return <DashHome />;
  };

  return (
    <>
      <main className="flex flex-col h-screen">
        <DashHeader />
        <main className="transition-colors duration-300 flex justify-between items-center">
          <SideBar />
          <div className=" p-5 w-full">{renderPage()}</div>
        </main>
      </main>
    </>
  );
};

export default Dashboard;
