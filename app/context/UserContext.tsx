"use client";

import { createContext, useContext, useState } from "react";

type UserContextType = {
  profileImage: string;
  setProfileImage: (image: string) => void;
};

const UserContext = createContext<UserContextType>({
  profileImage: "/images/User.png",
  setProfileImage: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {

  const [profileImage, setProfileImage] = useState("/images/User.png");

  return (

    <UserContext.Provider
      value={{
        profileImage,
        setProfileImage
      }}
    >
      {children}
    </UserContext.Provider>

  );
}

export function useUser() {
  return useContext(UserContext);
}