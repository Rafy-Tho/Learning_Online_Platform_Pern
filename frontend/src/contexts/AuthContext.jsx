import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMe } from "../hooks/queries/useAuth";
import { AuthContext } from "./context";

function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useGetMe();
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const saveAuth = useCallback(
    (userData) => {
      if (!userData || !userData.id) return;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");
      setUser(userData);
      queryClient.setQueryData(["me"], userData);
    },
    [queryClient],
  );

  const clearAuth = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    queryClient.removeQueries();
  }, [queryClient]);

  useEffect(() => {
    if (!isLoading && !user && localStorage.getItem("user")) {
      clearAuth();
    }
  }, [isLoading, user, clearAuth]);

  useEffect(() => {
    if (!isLoading && data) {
      saveAuth(data);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, saveAuth, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
