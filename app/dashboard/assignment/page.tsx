import React from 'react'
import DashboardHeader from '../../components/DashboardHeader'
import SideBar from '../../components/SideBar'

const Assignment = () => {
  return (
    <>
    <DashboardHeader/>
    <SideBar/>
    <main className='flex justify-center items-center h-screen'>
    <h1>Welcome To Assignment</h1>
    </main>
    </>
  )
}

export default Assignment