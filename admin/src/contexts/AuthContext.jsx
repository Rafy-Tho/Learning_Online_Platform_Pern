import { createContext, useContext, useEffect, useState } from "react";
import useGetMe from "../hooks/user/useGetMe";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { data, isPending } = useGetMe();

  const login = (data) => setUser(data.data);
  const logout = () => setUser(null);

  useEffect(() => {
    if (data?.data) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      login(data);
    }
  }, [data]);
  return (
    <AuthContext.Provider value={{ user, login, logout, isPending }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
