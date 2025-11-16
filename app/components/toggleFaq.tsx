"use client";
import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import Aos from 'aos';
import 'aos/dist/aos.css';

const faqs = [
  {
    id: 1,
    question: "What is Jamblify?",
    answer:
      "Jamblify is an online platform designed to help students prepare effectively for the JAMB examination. It provides practice questions, study tips, mock tests, and learning materials to boost your exam confidence.",
  },
  {
    id: 2,
    question: "Is Jamblify free to use?",
    answer:
      "Yes! Jamblify offers free practice tests and study materials. However, we also have premium plans with advanced analytics and AI-powered insights.",
  },
  {
    id: 3,
    question: "Can I track my JAMB progress?",
    answer:
      "Absolutely. Jamblify provides detailed performance analytics so you can identify your strengths and weaknesses as you study.",
  },
];

const ToggleFaq = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: false,
    });
  }, []);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id); // toggle open/close
  };

  return (
    <section className="flex justify-center items-center flex-col py-16 px-4 bg-gray-50" data-aos="fade-up">
      <div className="w-full max-w-[800px]">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Frequently Asked Questions
        </h1>

        {faqs.map((faq) => (
          <div key={faq.id} className="border-b border-gray-300 py-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleToggle(faq.id)}
            >
              <h2 className="text-lg font-medium text-gray-800">
                {faq.question}
              </h2>
              <button
                className="bg-[#051A9F] text-white rounded p-2 hover:bg-[#051A9F]/80 transition"
                aria-label="Toggle answer"
              >
                {activeFaq === faq.id ? <Minus size={18} /> : <Plus size={18} />}
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeFaq === faq.id ? "max-h-[200px] mt-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 text-sm md:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToggleFaq;
