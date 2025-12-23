"use client";

import { useEffect, useState } from "react";
import { databases, ID } from "../utils/appwrite";
import { Mail, Phone } from "lucide-react";
import WhatsappIcon from "../../public/whatsapp_icon.png";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(false);

  try {
    await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_EMAIL_COLLECTION!,
      ID.unique(),
      {
        first_name: firstName,
        second_name: lastName,
        email: email,
        Message: message,
        createdat: new Date().toISOString(), // REQUIRED by your collection
      }
    );

    setSuccess(true);
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  } catch (error) {
    console.error("Email submit failed:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      className="flex flex-col gap-6 bg-[#051A9F] p-8 rounded max-w-[450px]"
      data-aos="fade-left"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-white">First Name</label>
          <input
            type="text"
            placeholder="Jon"
            className="border p-2 rounded text-[#838383] bg-white focus:outline-[#051A9F] focus:outline-2 w-full"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="text-white">Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            className="border p-2 rounded text-[#838383] bg-white focus:outline-[#051A9F] focus:outline-2 w-full"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="text-white">Email address</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          className="border p-2 rounded text-[#838383] bg-white focus:outline-[#051A9F] focus:outline-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="text-white">Message</label>
        <textarea
          placeholder="Your message..."
          className="border p-4 rounded text-[#838383] bg-white focus:outline-[#051A9F] focus:outline-2 resize-none h-[150px] w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="relative flex justify-center items-center text-white rounded py-4 bg-[#160EBA] cursor-pointer hover:bg-[#160EBA]/80"
        disabled={loading}
      >
        {loading ? (
          <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          "Submit"
        )}
      </button>

      {success && (
        <p className="text-green-400 mt-2 animate-bounce">
          Message sent successfully ✅
        </p>
      )}
    </form>
  );
};

const ContactFormLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row justify-around items-center p-5 gap-10">
      <div className="w-full max-w-[450px] hidden md:flex flex-col gap-4" data-aos="fade-right">
        <h1 className="text-[25px] mb-2">
          Have any complaints? Reach out to us now
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Mail /> jamblify@gmail.com
          </div>
          <div className="flex items-center gap-2">
            <Phone /> +234 07074034251
          </div>
          <div className="flex items-center gap-2">
            <Image src={WhatsappIcon} alt="Whatsapp Icon" className="w-5 h-5" />
            +234 08034056385
          </div>
        </div>
      </div>

      <ContactForm />
    </section>
  );
};

export default ContactFormLayout;