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

    const strongPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

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
    <>
      <Header />
      <Toaster />
      <main className="pt-20 min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-8 md:p-10">
            <h1 className="text-3xl font-bold mb-2">
              Create your account 🚀
            </h1>
            <p className="text-gray-500 mb-8">
              Join us and get started in minutes
            </p>
            <form onSubmit={handleSignUp} className="space-y-5">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
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
                  required
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
                    required
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
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Confirm Password
                </label>
                <div className="flex items-center border rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
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
                {isLoading ? "Creating account..." : "Create account"}
              </button>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="flex-1 h-px bg-gray-300" />
                OR
                <div className="flex-1 h-px bg-gray-300" />
              </div>
              <button
                type="button"
                onClick={signUpWithGoogle}
                className="w-full flex items-center justify-center gap-3 border rounded-lg py-3 hover:bg-gray-50 transition"
              >
                <Image src={GoogleLogo} alt="Google" className="w-6 h-6" />
                Continue with Google
              </button>
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 font-medium">
                  Log in
                </Link>
              </p>
            </form>
          </div>
          <div className="hidden md:flex items-center justify-center bg-blue-50">
            <Image
              src={SignUpBg}
              alt="Signup illustration"
              className="max-w-md"
              priority
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SignUpPage;