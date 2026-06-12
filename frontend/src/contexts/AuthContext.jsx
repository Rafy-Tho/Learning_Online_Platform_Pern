import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useGetMe } from "../hooks/queries/useAuth";
import { AuthContext } from "./context";

function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useGetMe();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const saveAuth = (userData) => {
    if (!userData || !userData.id) return;
    saveLocal(userData);
    setUser(userData);
  };

  const clearAuth = () => {
    setUser(null);
    queryClient.clear();
    clearLocal();
  };

  function saveLocal(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  }

  function clearLocal() {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  }

  useEffect(() => {
    if (data) {
      saveAuth(data);
    } else if (!data && user) {
      clearAuth();
    }
  }, [data, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        saveAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
