"use client"
import React from 'react'
import {ArrowLeft} from "lucide-react"
import { useRouter } from 'next/navigation'

const BackButton = () => {
  const router = useRouter();

  const handleBackButton = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    router.back();
  }
  return (
    <>
    <main className='flex justify-around pt-20 pr-32 md:p-30'>
       <div>
         <button onClick={handleBackButton} className='p-4 bg-gray-400 rounded cursor-pointer'>
        <ArrowLeft/>
    </button>
    </div>
    <div></div>
    </main>
    </>
  )
}

export default BackButton;