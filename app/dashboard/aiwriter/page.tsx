"use client";
import { useEffect } from "react";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";
import EssayImage from "../../../public/essay_image.png";
import LetterImage from "../../../public/letter_image.png";
import StoryImage from "../../../public/story_page_img.png";
import OtherImage from "../../../public/other_image.png";
import SideBar from "../../components/SideBar";
import DashHeader from "../../components/DashboardHeader";
import Image from "next/image";

function TextContents() {
  return (
    <>
      <main className="flex justify-center items-center h-screen flex-col gap-15 mt-10 md:mt-0">
        <div>
          <h1 className="text-2xl text-center p-4" data-aos="zoom-in">
            Welcome to AI writer
          </h1>
          <p data-aos="zoom-in">Choose the kinda content you want to write</p>
        </div>
        <div
          className="flex gap-5 flex-wrap justify-center items-center"
          data-aos="fade-down"
        >
          <Link
            href="/dashboard/aiwriter/essay"
            className="flex justify-center flex-col gap-2 rounded-2xl transition duration-300 "
          >
            <Image
              src={EssayImage}
              alt="Essay Image"
              height={100}
              className="w-full rounded-2xl border-2 dark:border-white  border-blue-400 "
            />
            Essay
          </Link>
          <Link
            href="/dashboard/aiwriter/letter"
            className=" rounded-2xl transition duration-300"
          >
            <Image
              src={LetterImage}
              alt="Letter image"
              height={100}
              className="w-full rounded-2xl border-2 dark:border-white  border-blue-400 "
            />
            Letter
          </Link>
          <Link
            href="/dashboard/aiwriter/story"
            className="rounded-2xl transition duration-300"
          >
            <Image
              src={StoryImage}
              alt="Story Image"
              height={100}
              className="w-full rounded-2xl border-2 dark:border-white  border-blue-400 "
            />
            Story
          </Link>
          <Link
            href="/dashboard/aiwriter/other"
            className="rounded-2xl transition duration-300"
          >
            <Image
              src={OtherImage}
              alt="Other Image"
              height={100}
              className="w-full rounded-2xl border-2 dark:border-white  border-blue-400"
            />
            Other
          </Link>
        </div>
      </main>
    </>
  );
}

export function Aiwriter() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <DashHeader />
      <SideBar />
      <TextContents />
    </>
  );
}

export default Aiwriter;
