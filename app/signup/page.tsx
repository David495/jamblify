"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import GoogleLogo from "../../public/google_logo.png";
import SignUpBg from "../../public/signup_bg.png";
import Image from "next/image";
import { signUp } from "../utils/auth";
import { Toaster, toast } from "react-hot-toast";
import { account } from "../utils/appwrite";
import { OAuthProvider } from "appwrite";
import Header from "../components/Header";
import Footer from "../components/footer";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
    if (!strongPassword.test(password)) {
      toast.error("Password must include letters, numbers, and symbols");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email, name, password);
      toast.success("Sign up successful!");
      setTimeout(() => (window.location.href = "/dashboard"), 1500);
    } catch (error) {
      console.error("Error while signing up:", error);
      toast.error("Sign up failed");
      setIsLoading(false);
    }
  };

  const signUpWithGoogle = async () => {
    const successUrl = `${window.location.origin}/dashboard`;
    const failureUrl = `${window.location.origin}/signup?error=google-failed`;
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        successUrl,
        failureUrl
      );
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Google sign up failed");
    }
  };

  return (
    <>
      <Header/>
    <main className="h-screen flex flex-col md:flex-row justify-center items-center p-5 overflow-hidden mt-20">
      <Toaster />
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-3 p-10 rounded w-full max-w-[450px]"
      >
        <h1 className="text-xl font-semibold mb-2">
          Sign up to ace your JAMB
        </h1>

        <label className="text-xl">Your Full Name</label>
        <input
          type="text"
          className="shadow px-3 py-2 rounded outline-blue-400 bg-white"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
        />

        <label className="text-xl">Your Email Address</label>
        <input
          type="email"
          className="shadow px-3 py-2 bg-white rounded outline-blue-400"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />

        <label className="text-xl">Create a Password</label>
        <div className="flex shadow justify-between p-2 bg-white rounded">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a new password"
            className="outline-none flex-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>

        <label className="text-xl">Confirm Your Password</label>
        <div className="flex shadow justify-between p-2 bg-white rounded">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            className="outline-none flex-1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            disabled={isLoading}
          >
            {showConfirm ? <Eye /> : <EyeOff />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`p-3 rounded text-white transition cursor-pointer ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#0D0AD6] hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>

        <div className="flex flex-1 justify-center items-center gap-4">
          <hr className="flex flex-1" /> or <hr className="flex flex-1" />
        </div>

        <div
          className="flex justify-center border rounded items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
          onClick={signUpWithGoogle}
        >
          <Image src={GoogleLogo} alt="Google logo" className="h-10 w-10" />
          Sign up with Google
        </div>
      </form>

      <div className="hidden md:block">
        <Image src={SignUpBg} alt="Sign up Image" className="w-full" />
      </div>
      </main>
      <Footer/>
      </>
  );
};

export default SignUpPage;