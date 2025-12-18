"use client";
import React, { useState } from "react";
import DashHeader from "../../components/DashboardHeader";
import SideBar from "../../components/SideBar";
import CourseData from "../../coursesjson/course.json";
import { Search } from "lucide-react";

const CoursesPage = () => {
  const [searchResult, setSearchResult] = useState("");

  const filteredCourses = CourseData.filter(course => (
    course.title.toLowerCase().includes(searchResult.toLowerCase())
  ));
  return (
    <div className="flex w-full h-screen">
      <SideBar />

      <div className="flex gap-4 flex-col flex-1 h-full">
        <DashHeader />
        <div className="pt-25 flex justify-center items-center  flex-col gap-4">
          <h1 className="text-[20px] text-bold md:text-2xl ">Welcome to the courses page</h1>
        <p>Select a course to start learning</p>
        </div>
        <div className="max-w-xl mx-auto mb-6 flex items-center gap-2 border rounded-2xl px-6 py-3">
            <input
              type="text"
              placeholder="Search for a course..."
              value={searchResult}
              onChange={(e) => setSearchResult(e.target.value)}
              className="w-full outline-none text-sm md:text-base"
          />
          <Search/>
          </div>
        <main className="p-6 pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-3 rounded-xl shadow"
              >
                <div className="relative w-full max-w-[300px] mx-auto pb-[56.25%] rounded-lg overflow-hidden">
                  <iframe
                    src={course.src}
                    title={course.title}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>

                <h1 className="text-center mt-2 font-semibold text-[15px]">
                  {course.title}
                </h1>
              </div>
            ))}

            {
              filteredCourses.length === 0 && (
                  <p>You search result was not found 😞</p>
              )
            }
          </div>
        </main>
      </div>
    </div>
  );

};

export default CoursesPage;
