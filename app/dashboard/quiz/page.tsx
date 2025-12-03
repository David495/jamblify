import React from 'react'
import DashHeader from '../../components/DashboardHeader'
import SideBar from '../../components/SideBar'
const Quiz = () => {
  return (
    <>
    <DashHeader/>
    <SideBar/>
    <main className='flex justify-center items-center h-screen'>
        <h1> Welcome to Quiz Page</h1>
    </main>
    </>
  )
}

export default Quiz;