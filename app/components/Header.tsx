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
    <header className="flex justify-between items-center top-0 p-5 shadow-lg fixed left-0 right-0 bg-white dark:bg-gray-900 z-20 transition-colors">
      <div className="relative">
        {click && (
          <div
            className="fixed inset-0 bg-black/40 z-10"
            onClick={handleClick}
          ></div>
        )}
        <Link href="/">
          <Image
            src={JamblifyLogo}
            alt="Jamblify Logo"
            width={50}
            height={50}
            className="relative z-20"
          />
        </Link>
      </div>

      <nav className="hidden lg:flex md:flex gap-8 items-center">
        <Link
          href="/"
          className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Contact
        </Link>
        <Link
          href="/faqs"
          className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          FAQs
        </Link>
      </nav>

      <div className="gap-4 hidden md:flex">
        <Link href="/login">
          <button className="border border-blue-600 dark:border-blue-400 px-6 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white transition-colors text-gray-900 dark:text-gray-100">
            Log In
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-blue-600 dark:bg-blue-400 px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 text-white transition-colors">
            Sign Up
          </button>
        </Link>
      </div>

      <div className="flex md:hidden z-30">
        <button
          className="border border-blue-600 dark:border-blue-400 p-2 rounded-lg text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
          onClick={handleClick}
        >
          {click ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {click && (
        <div className="flex flex-col justify-between fixed top-0 right-0 h-screen w-full max-w-[300px] px-8 py-10 shadow-lg bg-white dark:bg-gray-900 z-20 transition-colors">
          <div>
            <li className="mt-10 list-none">
              <Link
                href="/"
                className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={handleClick}
              >
                Home
              </Link>
            </li>
            <li className="mt-5 list-none">
              <Link
                href="/about"
                className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={handleClick}
              >
                About
              </Link>
            </li>
            <li className="mt-5 list-none">
              <Link
                href="/contact"
                className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={handleClick}
              >
                Contact
              </Link>
            </li>
            <li className="mt-5 list-none">
              <Link
                href="/dashboard"
                className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={handleClick}
              >
                Dashboard
              </Link>
            </li>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <Link href="/login">
              <button className="border border-blue-600 dark:border-blue-400 px-6 py-2 rounded-lg w-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100">
                Log In
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-blue-600 dark:bg-blue-400 px-6 py-2 rounded-lg w-full text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;