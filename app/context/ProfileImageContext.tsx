"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface ProfileContextProps {
  profileImage: string;
  setProfileImage: (img: string) => void;
}

const ProfileContext = createContext<ProfileContextProps>({
  profileImage: "",
  setProfileImage: () => {},
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profileImage, setProfileImageState] = useState("");

  const setProfileImage = useCallback((img: string) => {
    setProfileImageState(img);
  }, []);

  useEffect(() => {
    const loadProfileImage = () => {
      const saved = localStorage.getItem("profile_image");
      if (saved) {
        setProfileImageState(saved);
      }
    };
    loadProfileImage();
  }, [setProfileImageState]);

  return (
    <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
