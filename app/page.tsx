"use client";
import Image from "next/image";
import JamblifyHeroImage from "../public/jamblify_hero_iamge.png";
import { useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Circles from "./components/Circles";
import ToggleFaq from "./components/toggleFaq";
import Testimonial from "./components/testimonial";
import Cta from "./components/cta";
import About_layout from "./components/about_layout";
import ContactFormLayout from "./components/contactFormLayout";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/footer";

// ..

interface ButtonProps {
  textContent: string;
}

const ReadMore = ({ textContent }: ButtonProps) => {
  return (
    <button className="px-4 py-2 rounded hover:bg-[#051A9F]/80 bg-[#051A9F]  text-white cursor-pointer">
      {textContent}
    </button>
  );
};

const Page = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: false, // whether animation should happen only once
    });
  }, []);
  return (
    <>
      <Header/>
      <main className="flex flex-col md:flex-row justify-center items-center h-auto md:h-screen max-w-[1300px] mx-auto px-6 py-20 gap-10 mt-20 md:mt-5">
        {/* Text Section */}
        <section
          className="max-w-[550px] flex flex-col gap-4 text-center md:text-left"
          data-aos="fade-in"
        >
          <h1 className="text-[40px] md:text-[50px] leading-tight font-semibold">
            Ace Your <strong className="text-[#051A9F]">JAMB</strong> With
            Confidence.
          </h1>
          <p className="text-[#838383] text-[15px] md:text-[17px] leading-relaxed">
            Jamblify gives you smart practice tests, personalized feedback, and
            AI-powered study tips — everything you need to score high and get
            into your dream university.
          </p>
          <Link href="/signup">
          <button className="bg-[#051A9F] text-white rounded-lg p-4 md:p-5 cursor-pointer hover:bg-[#051A9F]/80 transition-all duration-200 w-full">
            Start Practicing For Free
            </button>
            </Link>
        </section>

        {/* Image Section */}
        <figure
          className="flex justify-center w-full md:w-1/2"
          data-aos="fade-up"
        >
          <Image
            src={JamblifyHeroImage}
            alt="Jamblify Hero Image"
            className="w-full md:w-[95%] lg:w-[110%] h-auto object-contain"
            priority
          />
        </figure>
      </main>
      <main className="hidden justify-between overflow-hidden lg:flex md:hidden">
        <div className="relative right-25">
          <Circles />
        </div>
        <div className="relative left-25">
          <Circles />
        </div>
      </main>
      <main>
      <About_layout/>
      </main>
      <div className="flex justify-center items-center">
        <ReadMore textContent="Read More" />
      </div>
      <div>
        <ContactFormLayout/>
      </div>
      <h1 className="text-center text-3xl after:content-[''] after:block after:h-2 after:bg-[#051A9F] after:w-24 after:mx-auto after:rounded-2xl cursor-pointer">
        FAQS
      </h1>
      <section className="mt-10 p-4">
        <ToggleFaq />
      </section>
      <div className="p-5">
        <h1 className="text-center text-3xl after:content-[''] after:block after:h-2 after:bg-[#051A9F] after:w-24 after:mx-auto after:rounded-2xl">Testimonials</h1>
        <p className="text-center p-4">See what our customers say</p>
      </div>
      <section className="h-screen">
      <Testimonial />
      </section>
      <div>
      <Cta/>
      </div>
      <div className="mt-20">
      </div>
      <Footer/>
    </>
  );
};

export default Page;