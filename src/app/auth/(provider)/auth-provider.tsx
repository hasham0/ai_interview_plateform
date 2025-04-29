"use client";
import supabase from "@/services/supabaseClient";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Tables } from "../../../../database.types";
import { UserDetailsContext } from "@/context/user-details-context";

type Props = { children: ReactNode };

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<Tables<"Users"> | null>(null);
  const createNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      try {
        let { data: Users, error } = await supabase
          .from("Users")
          .select("*")
          .eq("email", user?.email || "");
        if (Users?.length === 0) {
          const { data, error } = await supabase.from("Users").insert({
            email: user?.email,
            name: user?.user_metadata.full_name,
            picture: user?.user_metadata.picture,
          });
          setUser(data);
          return;
        }
        if (Users && Users.length > 0) {
          setUser(Users[0]);
        }
      } catch (error) {}
    });
  };

  useEffect(() => {
    createNewUser();
  }, []);

  return (
    <UserDetailsContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export const useUserDetailsContext = () => {
  const context = useContext(UserDetailsContext);
  if (context === undefined) {
    throw new Error(
      "useUserDetailsContext must be used within a UserDetailsContextProvider"
    );
  }
  return context;
};
