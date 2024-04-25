import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  const contextValue = {
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
