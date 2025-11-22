import Header from "../components/Header";
import About_layout from "../components/about_layout";
import Footer from "../components/footer";
import Cta from "../components/cta";
import Pageprefix from "../components/pageprefix";
import Script from "next/script";
const About = () => {
  return (
    <>
      <Header/>
      <Pageprefix Page="About Us"/>
      <About_layout />
      <Cta />
      <div className="mt-20">
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

export default About;