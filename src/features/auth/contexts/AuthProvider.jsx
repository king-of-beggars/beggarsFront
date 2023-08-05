import React, { useState, useEffect, useContext } from 'react';

export const AuthContext = React.createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    const userId = localStorage.getItem('userId');
    const nickname = localStorage.getItem('nickname');

    if (!!refreshToken && !!userId && !!nickname) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
