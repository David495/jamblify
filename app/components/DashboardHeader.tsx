import Link from "next/link";
import Image from "next/image";
import LogoImage from "../../public/jamblify-logo.png";
import Profile from "../../public/profile_icon.png";
import ThemeToggle from "../components/ThemeToggle";
const DashHeader = () =>{
    return(
        <header className="flex justify-between items-center w-full z-150 bg-[#175680] dark:bg-blue-900 p-3 fixed top-0 left-0 right-0 transition-colors duration-300 overflow-hidden">
        <Link href="/dashboard">
        <Image src={LogoImage} alt="Logo" height={30} />
        </Link>
        <div className="flex items-center gap-5">
          <Image src={Profile} alt="Profile Icon" height={20} />
          <ThemeToggle />
        </div>
      </header>
    )
};

export default DashHeader;