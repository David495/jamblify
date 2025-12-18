"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import TestimonialImage_one from "./../../public/testimonial_1.png"
import TestimonialImage_two from "./../../public/testimonial_2.png"
import TestimonialImage_three from "./../../public/testimonial_3.png"
import TestimonialImage_four from "./../../public/testimonial_4.png";

const swiperContents = [
          {
          id: 1,
          name: "Samuel Agbaji",
          imageContent: TestimonialImage_one,
          testContent : `
          Jamblify helped me stay consistent with my studies. The daily quizzes and mock tests really boosted my confidence. I used to be scared of Physics, but after using Jamblify, I actually enjoy solving questions. I’m ready for JAMB now!
          `
        },
          {
          id: 2,
          name: "Jane Doe",
          imageContent: TestimonialImage_two,
          testContent : `I love how Jamblify breaks down each topic with clear explanations. It feels like a teacher is guiding me step by step. My Biology score improved a lot because of the app. I recommend it to every serious student`
          },
          {
            id: 3,
            name : "Abby Smith",
            imageContent : TestimonialImage_three,
            testContent : `
            Jamblify made studying fun! The interface is smooth, and I like how it motivates me with quotes and reminders. I don’t even feel stressed anymore while preparing — it’s like learning with friends
            `
          },
          {
            id: 4,
            name : "Alice Johnson",
            imageContent : TestimonialImage_four,
            testContent : `After failing JAMB once, I was discouraged. Then a friend introduced me to Jamblify. The mock exams and progress tracker helped me focus better and manage my time. This app truly gave me a second chance.`
          }
]
const Testimonial = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto py-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={100}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000 }}
        loop={true}
        className="mySwiper rounded-lg overflow-hidden"
      >
        {
          swiperContents.map((testimony) => (
        <SwiperSlide key={testimony.id}>
            <div className="bg-[#838383] w-full max-w-[1200px] min-h-[600px] md:min-h-[500px] px-10 py-16 flex justify-center items-center flex-col gap-4">
                <Image
                src={testimony.imageContent}
                alt="Testimonial Image One"
                className="w-40 h-40 rounded-full object-cover"
                />
                <h3 className="text-lg font-semibold">{testimony.name}</h3>
              <p className="text-gray-200 italic max-w-[600px]">{testimony.testContent}</p>
          </div>
        </SwiperSlide>
          ))
        }
      </Swiper>
    </section>
  );
};

export default Testimonial;