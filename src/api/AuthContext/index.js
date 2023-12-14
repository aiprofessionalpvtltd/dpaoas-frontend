import React, { createContext, useState } from "react";
import { loginUser } from "../APIs";
import { setAuthToken, setUserData } from "../Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);

  const login = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.data) {
        setAuthToken(response?.data?.token);
        setUserData(response.data?.user);
        setPermissions(response?.data?.permissions);
      }
      return response?.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        setPermissions,
        permissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
