"use client";
import Image from "next/image";
import LoginImage from "./../../public/login.png";
import GoogleImage from "../../public/google_logo.png";
import Link from "next/link";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setIsLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      toast.success("Login successful");
      setTimeout(() => (window.location.href = "/dashboard"), 1500);
    } catch (error) {
      toast.error("Error occurred while logging in");
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    const successUrl = `${window.location.origin}/dashboard`;
    const failureUrl = `${window.location.origin}/login?error=google-failed`;

    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        successUrl,
        failureUrl
      );
    } catch {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <>
      <Header />
      <Toaster />

      <main className="pt-20 min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-8 md:p-10">
            <h1 className="text-3xl font-bold mb-2">Welcome back 👋</h1>
            <p className="text-gray-500 mb-8">
              Please enter your login details
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Password
                </label>
                <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <Link
                  href="/forgotPassword"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg text-white font-semibold transition ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="flex-1 h-px bg-gray-300" />
                OR
                <div className="flex-1 h-px bg-gray-300" />
              </div>
              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-gray-50 transition"
              >
                <Image src={GoogleImage} alt="Google" className="w-6 h-6" />
                Continue with Google
              </button>
              <p className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-600 font-medium">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
          <div className="hidden md:flex items-center justify-center bg-blue-50">
            <Image
              src={LoginImage}
              alt="Login illustration"
              className="max-w-md"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;