"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { account } from "../utils/appwrite";
import { OAuthProvider } from "appwrite";
import { signUp } from "../utils/auth";
import Header from "../components/Header";
import Footer from "../components/footer";
import GoogleLogo from "../../public/google_logo.png";
import SignUpBg from "../../public/signup_bg.png";

const SignUpPage = () => {
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
      toast.success("Account created successfully");
      setTimeout(() => (window.location.href = "/dashboard"), 1500);
    } catch (error) {
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
    } catch {
      toast.error("Google sign up failed");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300 min-h-screen">
      <Header />
      <Toaster />
      <main className="pt-20 flex items-center justify-center px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden transition-colors duration-300">
          <div className="p-8 md:p-12">
            <h1 className="text-4xl font-extrabold mb-3 text-gray-800 dark:text-gray-100">
              Create your account 🚀
            </h1>
            <p className="text-gray-500 dark:text-gray-300 mb-10">
              Join us and get started in minutes
            </p>

            <form onSubmit={handleSignUp} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Password
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition bg-white dark:bg-gray-700">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full outline-none bg-transparent text-gray-800 dark:text-gray-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Confirm Password
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition bg-white dark:bg-gray-700">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full outline-none bg-transparent text-gray-800 dark:text-gray-100"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"
                  >
                    {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>

              <div className="flex items-center gap-3 text-gray-400 dark:text-gray-500">
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                OR
                <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
              </div>

              <button
                type="button"
                onClick={signUpWithGoogle}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-xl py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <Image src={GoogleLogo} alt="Google" className="w-6 h-6" />
                Continue with Google
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 dark:text-blue-400 font-medium">
                  Log in
                </Link>
              </p>
            </form>
          </div>

          <div className="hidden md:flex items-center justify-center bg-white dark:bg-gray-800 transition-colors duration-300">
            <Image
              src={SignUpBg}
              alt="Signup illustration"
              className="max-w-sm"
              priority
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUpPage;