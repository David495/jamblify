"use client"
import { useEffect } from 'react';
import Link from 'next/link';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Cta = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: false,
        });
    }, []);
  return (
    <section className="relative bg-[url('/cta_image.png')] bg-cover bg-center bg-no-repeat py-16 px-4 h-[80vh] flex flex-col justify-center items-center" data-aos="fade-up">
  <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-white text-center">
              <h1 className='text-4xl mb-2'>Turn Your Study Time Into Success Time.</h1>
              <p className='text-[17px]'>
                  Jamblify helps you stay focused, learn smarter, and get results faster.
            </p>
    <br />
    <Link href="/signup" className="mt-4 px-6 py-3 bg-[#051A9F] rounded hover:bg-[#051A9F]/80 transition-all duration-200 cursor-pointer">
      Join Jamblify Now
    </Link>
  </div>
</section>
  )
}

export default Cta;
