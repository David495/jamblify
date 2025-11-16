import JamblifyLogo from "../../public/jamblify-logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#144774] p-10 text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 place-items-center">
        <Link href="/">
          <div className="flex flex-col items-center gap-2">
            <Image src={JamblifyLogo} alt="Jamblify logo" width={100} height={100} />
            <p className="text-3xl font-semibold">Jamblify</p>
          </div>
        </Link>

        <div>
          <h1 className="font-semibold mb-2">About Us</h1>
          <ul className="flex flex-col gap-2">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/Testimonial">Testimonials</Link></li>
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-2">Quick Links</h1>
          <ul className="flex flex-col gap-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-2">Support</h1>
          <ul className="flex flex-col gap-2">
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/Testimonial">Help Center</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/faq">Report a problem</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col md:flex-row justify-center gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="border rounded border-white text-[#838383] bg-white outline-blue-400 text-xl px-4 py-2"
        />
        <button className="bg-[#051A9F] hover:bg-[#051A9F]/80 text-white px-6 py-2 rounded-xl cursor-pointer w-full max-w-[150px] text-xl">
          Subscribe
        </button>
      </div>

      <hr className="mt-8 border-white/20" />
    </footer>
  );
};

export default Footer;
