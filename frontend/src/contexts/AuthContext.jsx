import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useGetMe from '../hooks/user/useGetMe';
import { AuthContext } from './context';

function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useGetMe();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const saveAuth = (data) => {
    const userData = data?.data;
    if (!userData) return;
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const clearAuth = () => {
    setUser(null);
    queryClient.clear();
    localStorage.removeItem('user');
  };

  useEffect(() => {
    if (data?.data) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      saveAuth(data);
    } else if (!data?.data && user) {
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
