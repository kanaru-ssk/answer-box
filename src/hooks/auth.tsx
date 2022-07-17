// 認証

// react取得
import { createContext, useContext, useState, useEffect } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { User } from "types/firebase";

type node = {
  children: React.ReactNode;
};

const AuthContext = createContext<User | null>(null);

// ログイン認証
export const AuthProvider = ({ children }: node) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  // 認証ユーザー更新
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user: User | null) => {
      if (_user) {
        setUser(_user);
      } else {
        const { signInAnonymously } = await import("firebase/auth");
        signInAnonymously(auth);
      }
    });
    return () => unsubscribe();
  }, [auth, user]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
