import React, { createContext, useState, useEffect } from "react";
import { CheckPermission } from "../../utils/permissionsConfig";
import { getRoles, loginUser } from "../APIs";
import {
  getAuthToken,
  setAuthToken,
  setPermissionsData,
  setRolesData,
} from "../Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null);
  const [roles, setRoles] = useState([]);
  const [userLoginToken, setUserLoginToken] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        setRoles(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoles();
  }, []);

  const login = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.data) {
        setAuthToken(response?.data?.user?.id);
        if(roles) {
          setRolesData(roles);
          const res = CheckPermission(response?.data?.user?.roleName, roles, response?.data?.permissions);
          setPermissionsData(res?.permissions);
        }
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
        userLoginToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};