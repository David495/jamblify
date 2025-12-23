import React from 'react'
import 'aos/dist/aos.css';
interface PageprefixProps {
  Page?: string;
}

const Pageprefix : React.FC<PageprefixProps> = ({Page}) => {
  return (
    <main className=" relative bg-[url('/pageprefimg.png')] w-full h-[80vh] bg-cover bg-center flex flex-col justify-center items-center" data-aos ="fade-up">
      <div className='absolute inset-0 bg-black/70'></div>
      <div className='z-100'>
        <h1 className='text-4xl text-center text-white text-bold'>{ Page}</h1>
      </div>
      
    </main>  
  )
}

export default Pageprefix;