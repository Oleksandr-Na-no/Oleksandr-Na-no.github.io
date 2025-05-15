import React, { useEffect, useContext, useState, ReactNode } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

// ❌ TS2554: createContext expects a default value
type AuthContextType = {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// ✅ Custom hook to use the context safely
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// ✅ Typing the props of AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe(); // ✅ FIX: unsubscribe properly on unmount
  }, []);

  function initializeUser(user: User | null) {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value: AuthContextType = { currentUser, userLoggedIn, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
