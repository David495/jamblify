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

      <main className="pt-20 min-h-[calc(100vh-80px)] flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden transition-colors">
          {/* Left Form Section */}
          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-extrabold mb-3 text-gray-800 dark:text-gray-100">
              Welcome Back 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-10">
              Enter your details to access your account.
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition bg-white dark:bg-gray-800">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full outline-none text-gray-800 dark:text-gray-100 bg-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="/forgotPassword"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>

              {/* OR separator */}
              <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                OR
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
              </div>

              {/* Google login */}
              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-full flex items-center text-black justify-center gap-3 border border-gray-300 dark:border-gray-700 rounded-xl py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <Image src={GoogleImage} alt="Google" className="w-6 h-6" />
                Continue with Google
              </button>

              {/* Sign up link */}
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 dark:text-blue-400 font-medium">
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          {/* Right Image Section */}
          <div className="hidden md:flex items-center justify-center bg-gradient-to-tr from-blue-50 to-white dark:from-blue-900 dark:to-gray-800 transition-colors">
            <Image
              src={LoginImage}
              alt="Login illustration"
              className="max-w-sm"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
