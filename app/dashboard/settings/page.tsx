"use client";
import { ChangeEvent, useEffect, useState } from "react";
import DashHeader from "../../components/DashboardHeader";
import SideBar from "../../components/SideBar";
import { User, Trash2, LogOut, Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useProfile } from "../../../app/context/ProfileImageContext";
import { getCurrentUser, logout as authLogout } from "../../../app/utils/auth";
import { account } from "../../../app/utils/appwrite";

const SettingsPage = () => {
  const { profileImage, setProfileImage } = useProfile();
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      await getCurrentUser();
      const savedImage = localStorage.getItem("profile_image");
      if (savedImage) setProfileImage(savedImage);
    };
    fetchUser();
  }, [setProfileImage]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result as string);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setProfileImage("");
    localStorage.removeItem("profile_image");
  };

  const saveChanges = async () => {
    try {
      if (profileImage) localStorage.setItem("profile_image", profileImage);
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const changePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await account.updatePassword(currentPassword, newPassword);
      toast.success("Password changed");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Incorrect current password");
    }
  };

  const logoutUser = async () => {
    try {
      await authLogout();
      window.location.href = "/login";
    } catch {
      toast.error("Logout failed");
    }
  };

  const deleteAccount = async () => {
    if (!confirm("This action cannot be undone")) return;
    try {
      await (account as any).delete();
      window.location.href = "/signup";
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <Toaster />
      <DashHeader />
      <SideBar />

      <div className="h-16 md:h-20" />

      <main className="relative min-h-screen p-4 md:p-6 bg-white dark:bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-100/40 via-transparent to-purple-100/40 dark:from-indigo-900/20 dark:to-purple-900/20 animate-gradient-x" />

        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              Settings
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Manage your account preferences
            </p>
          </div>

          <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 mb-6">
            <div className="flex items-center gap-2 mb-4 text-neutral-900 dark:text-neutral-100">
              <User size={18} />
              <h3 className="font-medium">Profile</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-24 h-24 rounded-full border bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex items-center justify-center">
                {loading ? (
                  <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                ) : profileImage ? (
                  <img src={profileImage} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-neutral-500">No Image</span>
                )}
              </div>

              <div className="flex gap-3">
                <label className="px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded cursor-pointer transition">
                  Upload
                  <input type="file" onChange={handleUpload} className="hidden" />
                </label>
                {profileImage && (
                  <button
                    onClick={removeImage}
                    className="px-3 py-1.5 text-sm bg-rose-500 hover:bg-rose-600 text-white rounded cursor-pointer transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={saveChanges}
              className="mt-5 px-4 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded cursor-pointer transition"
            >
              Save changes
            </button>
          </section>

          <section className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
              Security
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              Update your password or sign out
            </p>

            <div className="grid gap-3 mb-5">
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Current password"
                  className="w-full px-3 py-2 text-sm rounded border bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer"
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="New password"
                  className="w-full px-3 py-2 text-sm rounded border bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer"
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="w-full px-3 py-2 text-sm rounded border bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 cursor-pointer"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={changePassword}
                className="px-4 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded cursor-pointer transition"
              >
                Change password
              </button>
              <button
                onClick={logoutUser}
                className="px-4 py-1.5 text-sm bg-neutral-700 hover:bg-neutral-800 text-white rounded cursor-pointer transition flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
              <button
                onClick={deleteAccount}
                className="px-4 py-1.5 text-sm bg-rose-600 hover:bg-rose-700 text-white rounded cursor-pointer transition flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default SettingsPage;
