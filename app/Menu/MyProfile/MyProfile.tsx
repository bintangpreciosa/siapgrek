"use client";

import Profile from "./Profile";
import ChangePassword from "./ChangePassword";

type Props = {
  active: string;
};

export default function MyProfile({ active }: Props) {

  /* DEFAULT PROFILE */
  if (
    active === "profile" ||
    active === "myprofile"
  ) {
    return <Profile />;
  }

  /* PASSWORD */
  if (active === "password") {
    return <ChangePassword />;
  }

  return <Profile />; // fallback
}