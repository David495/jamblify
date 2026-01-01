"use client";
import Image from "next/image";
import JamblifyHeroImage from "../public/jamblify_hero_iamge.png";
import { useEffect } from "react";
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
import Script from "next/script";

const Page = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="flex flex-col md:flex-row justify-center items-center h-auto md:h-screen max-w-[1200px] mx-auto px-6 py-20 gap-10 mt-20 md:mt-5">
        <section
          className="max-w-[450px] md:max-w-[300px] lg:max-w-[600px] flex flex-col gap-4 text-center md:text-left"
          data-aos="fade-in"
        >
          <h1 className="text-[40px] md:text-[30px] lg:text-[50px] leading-tight font-semibold">
            Ace Your <strong className="text-blue-900 dark:text-blue-500">JAMB</strong> With Confidence.
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-[15px] md:text-[17px] leading-relaxed">
            Jamblify gives you smart practice tests, personalized feedback, and AI-powered study tips — everything you need to score high and get into your dream university.
          </p>
          <Link href="/signup">
            <button className="bg-blue-900 dark:bg-blue-700 text-white rounded-lg p-4 md:p-5 cursor-pointer hover:bg-blue-800 dark:hover:bg-blue-600 transition-all duration-200 w-full">
              Start Practicing For Free
            </button>
          </Link>
        </section>

        <figure className="flex justify-center w-full md:w-1/2" data-aos="fade-up">
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

      <About_layout />

      <div className="flex justify-center items-center mt-4">
        <Link
          href="about"
          className="px-4 py-2 rounded bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 text-white cursor-pointer transition"
        >
          Read More
        </Link>
      </div>

      <ContactFormLayout />

      <Link href="/faqs">
        <h1 className="text-center text-3xl text-gray-800 dark:text-gray-100 after:content-[''] after:block after:h-2 after:bg-blue-900 dark:after:bg-blue-500 after:w-24 after:mx-auto after:rounded-2xl cursor-pointer mt-10">
          FAQS
        </h1>
      </Link>

      <section className="mt-10 p-4">
        <ToggleFaq />
      </section>

      <div className="p-5">
        <h1 className="text-center text-3xl text-gray-800 dark:text-gray-100 after:content-[''] after:block after:h-2 after:bg-blue-900 dark:after:bg-blue-500 after:w-24 after:mx-auto after:rounded-2xl">
          Testimonials
        </h1>
        <p className="text-center p-4 text-gray-600 dark:text-gray-300">
          See what our customers say
        </p>
      </div>

      <section className="h-screen">
        <Testimonial />
      </section>

      <Cta />

      <Script
        id="chatbase-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              if(!window.chatbase || window.chatbase("getState") !== "initialized") {
                window.chatbase = (...args) => { 
                  if(!window.chatbase.q) { window.chatbase.q = [] }
                  window.chatbase.q.push(args)
                };
                window.chatbase = new Proxy(window.chatbase, {
                  get(target, prop){
                    if(prop === "q") return target.q;
                    return (...args) => target(prop, ...args);
                  }
                });
              }
              const onLoad = function() {
                const script = document.createElement("script");
                script.src = "https://www.chatbase.co/embed.min.js";
                script.id = "NR57Wnf0KjNVEHrVv5ykR";
                script.domain = "www.chatbase.co";
                document.body.appendChild(script);
              };
              if(document.readyState === "complete") {
                onLoad();
              } else {
                window.addEventListener("load", onLoad);
              }
            })();
          `,
        }}
      />

      <div className="mt-20" />
      <Footer />
    </div>
  );
};

export default Page;