import Image from "next/image";
import JamblifyAboutImage from "../../public/jamblify_about_image.png";
import MissionImage from "../../public/mission_image.png";
import About_Diff from "../../public/about_diff.png";
import Link from "next/link";

const About_layout = () => {

  
  return (
    <>
      <Link href="/about">
      <h1 className="text-center text-3xl after:content-[''] after:block after:h-2 after:bg-[#051A9F] after:w-24 after:mx-auto after:rounded-2xl mt-30">
        About Us
        </h1>
        </Link>
      <section className="flex flex-col md:flex-row justify-center items-center h-auto md:h-screen gap-10 max-w-[1200px] mx-auto px-6 py-16">
        {/* Image Section */}
        <figure
          className="flex justify-center w-full md:w-1/2"
          data-aos="fade-up"
        >
          <Image
            src={JamblifyAboutImage}
            alt="Students learning with Jamblify app"
            className="w-full max-w-[500px] h-auto object-contain"
          />
        </figure>

        {/* Text Section */}
        <article
          className="flex flex-col justify-center max-w-[500px] text-center md:text-left gap-4"
          data-aos="fade-up"
        >
          <h1 className="text-[36px] font-semibold leading-tight">
            We Are <strong className="text-[#051A9F]">Jamblify</strong>
          </h1>

          <p className="text-[#838383] text-[16px] leading-relaxed">
            At Jamblify, we believe education should be smarter, faster, and
            more personal. That’s why we built an intelligent learning platform
            that helps students prepare for exams more effectively — using the
            power of AI-driven explanations, instant feedback, and bite-sized
            lessons that truly stick.
          </p>
        </article>
      </section>
      <Link href="/about">
      <h1 className="text-center text-3xl after:content-[''] after:block after:h-2 after:bg-[#051A9F] after:w-24 after:mx-auto after:rounded-2xl mt-5">
        Our Mission
        </h1>
      </Link>
      <main className="flex flex-col md:flex-row justify-center items-center h-auto md:h-screen gap-10 max-w-[1200px] mx-auto px-6 py-16">
      <article
          className="flex flex-col justify-center max-w-[500px] text-center md:text-left gap-4"
          data-aos="fade-up"
        >
          <h1 className="text-[36px] font-semibold leading-tight">
            Our Mission <strong className="text-[#051A9F]">(Jamblify)</strong>
          </h1>

          <p className="text-[#838383] text-[16px] leading-relaxed">
            Our mission is to help students learn smarter, not harder. We combine powerful learning tools, practice questions, and progress tracking into one simple, easy-to-use platform. Jamblify gives you everything you need to prepare confidently for JAMB — anywhere, anytime.
          </p>
        </article>
        <div>
          <Image
            src={MissionImage}
            alt="Students learning with Jamblify app"
            className="w-full max-w-[500px] h-auto object-contain rounded-lg"
          />
        </div>
      </main>
      <Link href="/about">
      <h1 className="text-center text-3xl after:content-[''] after:block after:h-2 after:bg-[#051A9F] after:w-60 after:mx-auto after:rounded-2xl mt-5">
        Our Difference
        </h1>
      </Link>
      <section className="flex flex-col md:flex-row justify-center items-center h-auto md:h-screen gap-10 max-w-[1200px] mx-auto px-6 py-16">
                <div>
          <Image
            src={About_Diff}
            alt="Students learning with Jamblify app"
            className="w-full max-w-[500px] h-auto object-contain rounded-lg"
          />
        </div>
        <article
          className="flex flex-col justify-center max-w-[500px] text-center md:text-left gap-4"
          data-aos="fade-up"
        >
          <h1 className="text-[36px] font-semibold leading-tight">
            What Makes Us Different
          </h1>

          <p className="text-[#838383] text-[16px] leading-relaxed">
At Jamblify, we don’t believe in one-size-fits-all learning. We understand that every student studies differently, so we’ve designed a platform that adapts to your pace, your style, and your goals.

Jamblify combines technology, simplicity, and motivation to create a complete learning experience — one that goes beyond just answering questions. We’re focused on helping you actually understand concepts, build confidence, and enjoy learning along the way.
          </p>
        </article>
      </section>
      
      </>
  )
}

export default About_layout;