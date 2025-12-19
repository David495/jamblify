"use client";
import { ChangeEvent, useEffect, useState } from "react";
import DashHeader from "../../components/DashboardHeader";
import SideBar from "../../components/SideBar";
import { User } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useProfile } from "../../../app/context/ProfileImageContext";
import { getCurrentUser, LogOut } from "../../../app/utils/auth";
import { account } from "../../../app/utils/appwrite";

const SettingsPage = () => {
  const { profileImage, setProfileImage } = useProfile();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setName(user.name || "");
        setEmail(user.email);
      }
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
      const img = reader.result as string;
      setProfileImage(img);
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

      toast.success("Profile saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    }
  };

  const changePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    try {
      await account.updatePassword(currentPassword, newPassword);
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to change password. Check your current password.");
    }
  };
  const logout = async () => {
    try {
      await LogOut();
      toast.success("Logged out successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out.");
    }
  };

  return (
    <>
      <Toaster />
      <DashHeader />
      <SideBar />
      <main className="bg-gray-300 min-h-screen p-6">
        <h1 className="text-2xl font-semibold mt-20 ">Settings</h1>
        <p className="mb-6">Manage your account settings and preferences</p>

        <section className="border bg-white p-6 mb-6 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <User />
            <h4 className="text-lg font-bold">Profile Information</h4>
          </div>
          <p className="mb-4">Update your personal information</p>

          <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center border">
            {loading ? (
              <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            ) : profileImage ? (
              <img
                src={profileImage}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>

          <div className="mt-3 flex gap-3">
            <label
              htmlFor="avatarUpload"
              className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Upload Profile Picture
              <input
                type="file"
                onChange={handleUpload}
                className="hidden"
                id="avatarUpload"
              />
            </label>

            {profileImage && (
              <button
                onClick={removeImage}
                className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>

          <hr className="my-4" />
          <button
            onClick={saveChanges}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Save Changes
          </button>
        </section>

        <section className="border bg-white p-6 mb-6 rounded-lg">
          <h4 className="text-lg font-bold mb-2">Security</h4>
          <p className="mb-4">Update your password and manage account access</p>

          <div className="flex flex-col gap-4 mb-4">
            <input
              type="password"
              placeholder="Current Password"
              className="border p-2 rounded"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              className="border p-2 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="border p-2 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            onClick={changePassword}
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4 cursor-pointer"
          >
            Change Password
          </button>

          <hr className="my-4" />

          <button
            onClick={logout}
            className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Logout
          </button>
        </section>
      </main>
    </>
  );
};

export default SettingsPage;