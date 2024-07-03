import { createContext, useEffect, useState, useCallback } from 'react';

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
  const [logoutTimer, setLogoutTimer] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem("userData");
    setToken(null);
    setIsLoggedIn(false);
    setUserId(null);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, [logoutTimer]);

  const login = useCallback((userId, token, expirationDate) => {
    setToken(token);
    const logoutTime = expirationDate || new Date(new Date().getTime() + 3600000);
    localStorage.setItem("userData", JSON.stringify({ userId, token, expirationDate: logoutTime.toISOString() }));
    setIsLoggedIn(true);
    setUserId(userId);

    const remainingTime = new Date(logoutTime).getTime() - new Date().getTime();
    
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    const timer = setTimeout(logout, remainingTime);
    setLogoutTimer(timer);
  }, [logout, logoutTimer]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && storedData.expirationDate) {
      if (new Date().getTime() < new Date(storedData.expirationDate).getTime()) {
        login(storedData.userId, storedData.token, new Date(storedData.expirationDate));
      } else {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [logoutTimer]);

  const contextValue = {
    token,
    isLoggedIn,
    userId,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
