"use client";
import { createContext } from "react";
import { Tables } from "../../database.types";

type UserContextTS = {
  user: Tables<"Users"> | null;
  setUser: React.Dispatch<React.SetStateAction<Tables<"Users"> | null>>;
};

export const UserDetailsContext = createContext<UserContextTS>({
  user: null,
  setUser: () => {},
});
