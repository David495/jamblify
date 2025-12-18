"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import JamblifyLogo from "../../public/jamblify-logo.png";
const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  return (
    <header className="flex justify-between items- top-0 p-5 shadow-lg fixed left-0 right-0 bg-white z-20">
      <div>
        {
          click && (
            <div className="fixed inset-0 bg-black/40" onClick={handleClick}></div>
          )
        }
        <Link href="/">
          <Image src={JamblifyLogo} alt="Jamblify Logo" width={50} height={50} />
          </Link>
      </div>
      <nav className="hidden lg:flex gap-8 md:flex items-center ">
        <Link href="/" className="dark:text-black">Home</Link>
        <Link href="/about" className="dark:text-black">About</Link>
        <Link href="/contact" className="dark:text-black">Contact</Link>
        <Link href="/faqs" className="dark:text-black">Faqs</Link>
      </nav>
      <div className="gap-4 hidden md:flex">
        <Link href="/login">
        <button className="cursor-pointer border border-[#0D0AD6] px-8 py-3 rounded hover:bg-[#0D0AD6] hover:text-white dark:text-black">
          Log In
          </button>
        </Link>
        <Link href="/signup">
        <button className="bg-[#0D0AD6] px-8 py-3 text-white rounded cursor-pointer hover:bg-[#0D0AD6]/80 relative z-10">
          Sign Up
          </button>
        </Link>
      </div>
      <div className="flex md:hidden z-5">
        <button
          className="cursor-pointer border border-[#0D0AD6] p-2 rounded"
          onClick={handleClick}
        >
          {click ? <X  className="dark:text-black"/> : <Menu  className="dark:text-black"/>}
        </button>
      </div>
      {click ? (
        <div className=" flex flex-col justify-around fixed top-0 right-1 h-screen w-full max-w-[300px] px-8 py-10 shadow-lg bg-white">
          <div>
            <li className="mt-10 list-none">
              <Link href="/" className="dark:text-black" onClick={handleClick}>
                Home
              </Link>
            </li>
            <li className="mt-5 list-none">
              <Link href="/about" className="dark:text-black" onClick={handleClick}>
                About
              </Link>
            </li>
            <li className="mt-5 list-none">
              <Link href="/contact" className="dark:text-black" onClick={handleClick}>
                Contact
              </Link>
            </li>
            <li className="mt-5 list-none">
              <Link href="/dashboard" className="dark:text-black" onClick={handleClick}>
                Dashboard
              </Link>
            </li>
          </div>
          <div className="gap-4 flex-col flex mt-2">
            <Link href="/login">
            <button
              className="border px-8 py-3 rounded cursor-pointer w-full dark:text-black"
            >  
                Log In
              </button>
            </Link>
            <Link href="/signup" className="bg-[#0D0AD6] px-8 py-3 text-white rounded cursor-pointer hover:bg-[#0D0AD6]/80 relative z-10 text-center">
              Sign Up
              </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
