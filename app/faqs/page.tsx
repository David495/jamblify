"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import { Plus, Minus } from "lucide-react";
import Aos from "aos";
import "aos/dist/aos.css";

const faqs = [
  {
    id: 1,
    question: "What is Jamblify?",
    answer:
      "Jamblify is an online platform designed to help students prepare effectively for the JAMB examination...",
  },
  {
    id: 2,
    question: "Is Jamblify free to use?",
    answer:
      "Yes! Jamblify offers free practice tests and study materials. However, we also have premium plans...",
  },
  {
    id: 3,
    question: "Can I take mock exams on Jamblify?",
    answer:
      "Yes! Jamblify provides timed mock examinations that simulate the real JAMB environment.",
  },
  {
    id: 4,
    question: "Do I need an account to use Jamblify?",
    answer:
      "Yes, you do need to signup or login to create your account, in order to access the essential features in jamblify ",
  },
  {
    id: 5,
    question: "Is Jamblify accessible on mobile phones?",
    answer:
      "Yes, Jamblify works smoothly on all devices including Android, iPhone, tablets, and laptops.",
  },
  {
    id: 6,
    question: "Which subjects does Jamblify cover?",
    answer:
      "Jamblify covers Use of English, Mathematics, Physics, Chemistry, Biology, Economics, Government...",
  },
  {
    id: 7,
    question: "How accurate are the answers and explanations?",
    answer:
      "All answers are verified by experienced educators and subject experts to ensure accuracy.",
  },
  {
    id: 8,
    question: "Can Jamblify help me improve my score quickly?",
    answer:
      "Yes! With consistent practice using Jamblify’s smart recommendations and mocks...",
  },
];

const FaqPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  const handleToggle = (id: number) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <>
      <Header />
      <div className="text-center py-16 px-4 mt-20">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Need Some Help?</h1>
        <p className="text-gray-600 mt-2">
          Our FAQs can help you with quick answers. If not, reach out via email:
        </p>
        <p className="text-blue-600 font-semibold mt-1">jamblify@gmail.com</p>
      </div>
      <main
        className="flex justify-center px-4 pb-20 bg-gray-50"
        data-aos="fade-up"
      >
        <section className="w-full max-w-3xl bg-white shadow-sm rounded-xl p-6 mt-10">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b border-gray-200 py-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleToggle(faq.id)}
              >
                <h2 className="text-base md:text-lg font-medium text-gray-800">
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
                  activeFaq === faq.id ? "max-h-[500px] mt-3" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FaqPage;