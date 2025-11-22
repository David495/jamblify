import React from 'react'
import Image from 'next/image';
import NotFoundImage from '../public/not-found.png'
import Header from '../app/components/Header';
import Footer from '../app/components/footer';
import Script from 'next/script';
import Link from 'next/link';

const Notfound = () => {
  return (
      <>
          <Header/>
          <main className='flex justify-center items-center h-screen flex-col gap-3'>
              <Image
                  src={NotFoundImage}
                  alt='Not Found Image'
                  height={200}
              />
              <div>
                  <h1 className='text-center text-2xl'>404</h1>
                  <p>
                      Page not found
                  </p>
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
      <Link href='/'>Back to Home</Link>
      </main>
      <Footer/>
      </>
  )
}

export default Notfound;
