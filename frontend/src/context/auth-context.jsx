import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const [token, setToken] = useState(() => {
    return storedData ? storedData.token : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return storedData ? true : false;
  });
  const [userId, setUserId] = useState(() => {
    return storedData ? storedData.userId : null;
  });
  
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
    token,
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
