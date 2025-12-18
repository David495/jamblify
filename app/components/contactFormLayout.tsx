"use client";
import { useEffect } from 'react'
import { Mail, Phone } from "lucide-react";
import Link from 'next/link';
import WhatsappIcon from ".././../public/whatsapp_icon.png";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from 'next/image';


const ContactFormLayout = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
        })
    }, []);
  return (
      <>
          <section className="w-full h-screen flex justify-around items-center p-5">
        <div className="w-full max-w-[450px] hidden md:flex flex-col" data-aos="fade-right">
          <h1 className="text-[25px] mb-2">
            Have any complaints ? reach out to us now
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Mail />
              jamblify@gmail.com
            </div>
            <div className="flex gap-2">
              <Phone />
              +234 07074034251
            </div>
            <div className="flex gap-2">
              <Image src={WhatsappIcon} alt="Whatsapp Icon" />
              +234 08034056385
            </div>
          </div>
        </div>
        <form className="flex flex-col gap-6 bg-[#051A9F] p-8 rounded max-w-[450px]" data-aos="fade-left">
          <div className="flex gap-2">
            <div>
              <label className="text-white">First Name</label>
              <br />
              <input
                type="text"
                placeholder="Jon"
                className="border p-2 rounded text-[#838383] bg-white focus:outline-[#051A9F] focus:outline-2 w-full max-w-50"
              />
            </div>
            <div>
              <label className="text-white">Last Name</label>
              <br />
              <input
                type="text"
                placeholder="last Name"
                className="border p-2 rounded text-[#838383] bg-white focus:outline-[#051A9F] focus:outline-2 w-full max-w-50"
              />
            </div>
          </div>
          <label className="text-white">Email address</label>
          <input
            type="email"
            className="border p-2 rounded text-[#838383] bg-white focus:outline-[#051A9F] focus:outline-2"
          />
          <label className="text-white">Message</label>
          <textarea className="border p-4 rounded text-[#838383] bg-white focus:outline-[#051A9F] focus:outline-2 resize-none h-[150px]" />
          <button className="text-white rounded py-4 bg-[#160EBA] cursor-pointer hover:bg-[#160EBA]/80">
            Submit
          </button>
        </form>
      </section>
      </>
  )
}

export default ContactFormLayout;