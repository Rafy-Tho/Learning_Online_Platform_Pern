import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./context";
import { useState } from "react";

function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const saveAuth = (data) => {
    localStorage.setItem("user", JSON.stringify(data.data));
    setUser(data.data);
  };

  const clearAuth = () => {
    localStorage.removeItem("user");
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        saveAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
