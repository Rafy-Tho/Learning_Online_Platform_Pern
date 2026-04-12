import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useGetProfile from "../hooks/user/useGetProfile";
import { AuthContext } from "./context";

function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const { data, isPending } = useGetProfile();
  const [user, setUser] = useState(null);

  const saveAuth = (data) => {
    setUser(data.data);
  };

  const clearAuth = () => {
    setUser(null);
    queryClient.clear();
  };

  useEffect(() => {
    if (data?.data) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      saveAuth(data);
    }
  }, [data]);
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
