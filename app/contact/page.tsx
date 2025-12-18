import React from 'react'
import ContactFormLayout from '../components/contactFormLayout';
import Pageprefix from '../components/pageprefix';
import Header from '../components/Header';
import Footer from '../components/footer';
import Script from 'next/script';
const Contact = () => {
  return (
    <>
      <Header/>
      <Pageprefix Page="Contact Us"/>
      <main className='mt-10'>
      <ContactFormLayout />
      </main>
      <h1 className='text-center p-5 text-2xl text-bold'>We are on the map</h1>
      <div className='mb-10' data-aos= "zoom-in">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8070639.283284887!2d3.3710119065334845!3d8.995886348042319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0baf7da48d0d%3A0x99a8fe4168c50bc8!2sNigeria!5e0!3m2!1sen!2sng!4v1762168355418!5m2!1sen!2sng" width={600} height={450} style={{ border: 0 }} loading="lazy" className='w-full h-[90vh]'></iframe>
      </div>
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
      <Footer/>
      </>
  )
}

export default Contact;
