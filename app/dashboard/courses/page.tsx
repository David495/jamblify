import React from 'react'
import DashHeader from "../../components/DashboardHeader"
import SideBar from "../../components/SideBar"

const CoursesPage= () => {
  return (
    <>
    <DashHeader/>
    <SideBar/>
    <main className='flex justify-center items-center h-screen'>
<h1>Welcome to Courses</h1>
    </main>
    </>
  )
}

export default CoursesPage;