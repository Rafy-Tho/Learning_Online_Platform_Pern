import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useGetProfile from "../hooks/user/useGetProfile";
import { AuthContext } from "./context";

function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const { data, isPending, error } = useGetProfile();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    } else if (error) {
      setUser(null);
    }
  }, [data, error]);
  const saveAuth = (data) => {
    setUser(data.data);
  };

  const clearAuth = () => {
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isPending,
        saveAuth,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
