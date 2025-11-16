"use client"
import Image from "next/image";
import LoginImage from "./../../public/login.png"
import GoogleImage from "../../public/google_logo.png"
import Link from "next/link";
import { LoginFuction } from "../utils/auth";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { account } from "../utils/appwrite";
import { OAuthProvider } from "appwrite";
import { Eye, EyeOff } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [EyeIcon, setEyeIcon] = useState(false);

  const handleEyeToggle = (e: React.FormEvent) => {
    e.preventDefault();
    setEyeIcon(!EyeIcon);
  }
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }

    setIsLoading(true);

    try {
      await account.createEmailPasswordSession(email, password);
      LoginFuction(email, password);
      toast.success('Login successful');
      setTimeout(() => (window.location.href = "/dashboard"), 1500);
    } catch (error) {
      toast.error('Error occurred while logging in');
      console.error('Error while logging in:', error);
      setIsLoading(false);
    }
  }

  const loginWithGoogle = async () => {
    const successUrlRedirect = `${window.location.origin}/dashboard`;
    const failureRedirectUrl = `${window.location.origin}/login?error=google-failed`;
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        successUrlRedirect,
        failureRedirectUrl
      );
    } catch (error) {
      toast.error('Error while signing in with Google');
      console.error('Error while signing in with Google:', error);
    }
  }

  return (
    <>
      <Header/>
    <main className="flex flex-col md:flex-row justify-center items-center p-10 mt-10 md:mt-5 h-screen overflow-hidden">
      <Toaster />
      <div className="flex justify-center items-center flex-col p-5 rounded">
        <h1 className="text-2xl md:text-3xl font-semibold">Welcome back</h1>
        <p className="text-[#838383] mt-4">Welcome back, please enter your credentials</p>
        <form className="flex flex-col p-5 gap-3" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-[#838383] rounded shadow outline-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <label>Password</label>
          <div className="w-full px-3 py-2 shadow flex items-center">
          <input
              type={ EyeIcon ?  "text" : "password"}
            placeholder="Password"
            value={password} className="border-none outline-none "
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
            />
            <button onClick={handleEyeToggle}>
              {EyeIcon ? <Eye/> : <EyeOff/>}
            </button>
          </div>
          <div className="flex gap-4">
            <input
              type="checkbox"
              className="h-5 w-5 rounded-full appearance-none border-2 border-gray-400 checked:bg-[#0D0AD6] checked:before:content-['✓'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center checked:before:text-sm"
            />
            <p className="text-[14px] md:text-[16px]">Remember for 30 days</p>
            <Link href="/forgotPassword" className="text-[14px] md:text-[16px]">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`border p-3 rounded text-xl text-white transition ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0D0AD6] hover:bg-[#0D0AD6]/80 cursor-pointer"
            }`}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
          <div
            className="border p-3 rounded border-[#838383] cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50"
            onClick={loginWithGoogle}
          >
            <Image
              src={GoogleImage}
              alt="Google logo"
              className="h-10 w-10 object-cover hidden md:block"
            />
            Sign in with Google
          </div>
          <p>
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500 text-[17px]">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Image
          src={LoginImage}
          alt="Log in image"
          className="w-full hidden md:block"
        />
      </div>
      </main>
      <Footer/>
      </>
  )
}

export default Login;