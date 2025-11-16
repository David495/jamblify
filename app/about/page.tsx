import Header from "../components/Header";
import About_layout from "../components/about_layout";
import Footer from "../components/footer";
import Cta from "../components/cta";
import Pageprefix from "../components/pageprefix";
const About = () => {
  return (
    <>
      <Header/>
      <Pageprefix Page="About Us"/>
      <About_layout />
      <Cta />
      <div className="mt-20">
      </div>
      <Footer/>
      </>
  )
}

export default About;