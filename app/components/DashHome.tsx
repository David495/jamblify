"use client"
import React, {useState} from 'react'
import {  CircleArrowUp } from "lucide-react";

const DashHome = () => {
    const [showArrow, setShowArrow] = useState(false);
  const arrowDisplay = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setShowArrow(true);
    }
    else {
      setShowArrow(false);
    }
  }
  return (
    <section className="flex justify-center items-center h-screen flex-col gap-5">   
          <h1 className="text-2xl dark:text-white font-bold">Hello David</h1>
          <div className="flex p-4 shadow">
            <input type="text" className="outline-none " placeholder="Ask me anything" onChange={arrowDisplay}/>
            {
              showArrow ? <CircleArrowUp/> : ""
            }
          </div>
        </section>
  )
}

export default DashHome;