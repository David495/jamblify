"use client"
import React, { useState } from 'react'
import DashHeader from "../../components/DashboardHeader"
import SideBar from "../../components/SideBar"
import Link from 'next/link';

const JambSimulator = () => {
  const [showBtn, setShowBtn] = useState<number | null>(null);

   const subjects = [
    "",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Accounting",
    "Computer",
    "Commerce",
    "Geography",
    "C.R.K",
    "Literature"
  ];
  
  return (
    <>
    <DashHeader/>
    <SideBar/>
      <main>
        <section className='flex justify-center items-center flex-col mt-20'>
          <h1 className='text-2xl text-gray-700'>Choose the Subjects that you want to practice</h1>
        <p className='text-gray-400'>You can only practice one at a time</p>
        </section>
        <section className='flex justify-center items-center flex-col gap-5 p-10'>
          <div className='flex flex-col max-w-60 md:max-w-[400px] w-full gap-2' onClick={() => setShowBtn(1)}>
            <Link href="#" className='bg-blue-800 rounded hover:bg-blue-800/90 text-white py-2  text-center'>The Use Of English Language</Link>
            <Link href="/dashboard/simulator/englishPage" className={`${showBtn === 1 ? "block" : "hidden"} px-4 py-2 bg-blue-500 text-white rounded`}>Start Exam</Link>
          </div>
          <div className='flex flex-col max-w-60 md:max-w-[400px] w-full gap-2' onClick={() => setShowBtn(2)}>
            <Link href="" className='bg-blue-800 rounded hover:bg-blue-800/90 text-white py-2  text-center'>Mathematics</Link>
            <Link href="/dashboard/simulator/mathematics" className={`${showBtn === 2 ? "block" : "hidden"}  px-4 py-2 bg-blue-500 text-white rounded`}>Start Exam</Link>
          </div>
          <div className='flex flex-col max-w-60 md:max-w-[400px] w-full gap-2' onClick={() => setShowBtn(4)}>
            <Link href="" className='bg-blue-800 rounded hover:bg-blue-800/90 text-white py-2  text-center'>Physics</Link>
            <Link href="/dashboard/simulator/physicsPage" className={`${showBtn === 4 ? "block" : "hidden"}  px-4 py-2 bg-blue-500 text-white rounded`}>Start Exam</Link>
          </div>
          <div className='flex flex-col max-w-60 md:max-w-[400px] w-full gap-2' onClick={() => setShowBtn(5)}>
            <Link href="" className='bg-blue-800 rounded hover:bg-blue-800/90 text-white py-2  text-center'>Chemistry</Link>
            <Link href="/dashboard/simulator/chemistry" className={`${showBtn === 5 ? "block" : "hidden"}  px-4 py-2 bg-blue-500 text-white rounded`}>Start Exam</Link>
          </div>
          <div className='flex flex-col max-w-60 md:max-w-[400px] w-full gap-2' onClick={() => setShowBtn(6)}>
            <Link href="" className='bg-blue-800 rounded hover:bg-blue-800/90 text-white py-2  text-center'>Biology</Link>
            <Link href="/dashboard/simulator/biology" className={`${showBtn === 6 ? "block" : "hidden"}  px-4 py-2 bg-blue-500 text-white rounded`}>Start Exam</Link>
          </div>
          <div className='flex flex-col max-w-60 md:max-w-[400px] w-full gap-2' onClick={() => setShowBtn(7)}>
            <Link href="" className='bg-blue-800 rounded hover:bg-blue-800/90 text-white py-2  text-center'>Accounting</Link>
            <Link href="/dashboard/simulator/accounting" className={`${showBtn === 7 ? "block" : "hidden"}  px-4 py-2 bg-blue-500 text-white rounded`}>Start Exam</Link>
          </div>
          <div className='flex flex-col max-w-60 md:max-w-[400px] w-full gap-2' onClick={() => setShowBtn(8)}>
            <Link href="" className='bg-blue-800 rounded hover:bg-blue-800/90 text-white py-2  text-center'>Computer</Link>
            <Link href="/dashboard/simulator/computer" className={`${showBtn === 8 ? "block" : "hidden"}  px-4 py-2 bg-blue-500 text-white rounded`}>Start Exam</Link>
          </div>
          <div className='flex flex-col max-w-60 md:max-w-[400px] w-full gap-2' onClick={() => setShowBtn(9)}>
            <Link href="" className='bg-blue-800 rounded hover:bg-blue-800/90 text-white py-2  text-center'>Geography</Link>
            <Link href="/dashboard/simulator/geography" className={`${showBtn === 9 ? "block" : "hidden"}  px-4 py-2 bg-blue-500 text-white rounded`}>Start Exam</Link>
          </div>
          <div className='flex flex-col max-w-60 md:max-w-[400px] w-full gap-2' onClick={() => setShowBtn(10)}>
            <Link href="" className='bg-blue-800 rounded hover:bg-blue-800/90 text-white py-2  text-center'>C.R.K</Link>
            <Link href="/dashboard/simulator/crk" className={`${showBtn === 10 ? "block" : "hidden"}  px-4 py-2 bg-blue-500 text-white rounded`}>Start Exam</Link>
          </div>
          <div className='flex flex-col max-w-60 md:max-w-[400px] w-full gap-2' onClick={() => setShowBtn(11)}>
            <Link href="" className='bg-blue-800 rounded hover:bg-blue-800/90 text-white py-2  text-center'>Literature</Link>
            <Link href="/dashboard/simulator/literature" className={`${showBtn === 11 ? "block" : "hidden"}  px-4 py-2 bg-blue-500 text-white rounded`}>Start Exam</Link>
          </div>
        </section>
    </main>
    </>
  )
};

export default JambSimulator;