import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = (userId, token) => {
    setToken(token);
    localStorage.setItem("userData", JSON.stringify({ userId, token }));
    setIsLoggedIn(true);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setToken(null);
    setIsLoggedIn(false);
    setUserId(null);
  };

  const contextValue = {
    isLoggedIn,
    userId,
    login,
    logout,
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
