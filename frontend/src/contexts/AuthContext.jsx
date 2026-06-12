import { useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMe } from "../hooks/queries/useAuth";
import { AuthContext } from "./context";

function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useGetMe();
  const user = data ?? null;

  const saveAuth = useCallback((userData) => {
    if (!userData || !userData.id) return;
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
    queryClient.setQueryData(["me"], userData);
  }, [queryClient]);

  const clearAuth = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    if (!isLoading && !user && localStorage.getItem("user")) {
      clearAuth();
    }
  }, [isLoading, user, clearAuth]);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, saveAuth, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
