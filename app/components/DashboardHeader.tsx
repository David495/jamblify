"use client";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "../../public/jamblify-logo.png";
import ThemeToggle from "../components/ThemeToggle";
import { useProfile } from "../../app/context/ProfileImageContext";

const DashHeader = () => {
  const { profileImage } = useProfile();

  return (
    <header className="flex justify-between items-center w-full z-150 bg-[#175680] dark:bg-blue-900 p-3 fixed top-0 left-0 right-0 transition-colors duration-300 overflow-hidden">
      <div className="flex gap-5 items-center">
        <Link href="/dashboard">
          <Image src={LogoImage} alt="Logo" height={50} />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <Link href="/dashboard/settings">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <Image src="/profile_icon.png" alt="Profile Icon" height={30} width={30} />
          )}
          </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default DashHeader;