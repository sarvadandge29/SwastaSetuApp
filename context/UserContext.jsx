import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const getUserDetails = async (userId) => {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("userId", userId)
        .single();

      if (error) {
        console.error("Error fetching user details:", error);
      } else {
        setUserDetails(data);
      }
    };

    const getCurrentSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setSession(session);
        getUserDetails(session.user.id);
      } else {
        setUser(null);
        setUserDetails(null);
        setSession(null);
      }
    };

    getCurrentSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        setSession(session);
        getUserDetails(session.user.id);
      } else {
        setUser(null);
        setUserDetails(null);
        setSession(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, userDetails, session }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};