import React, { createContext, useState } from "react";
import { CheckPermission } from "../../utils/permissionsConfig";
import { getRoles, loginUser } from "../APIs";
import { useEffect } from "react";
import {
  getAuthToken,
  setAuthToken,
  setPermissionsData,
  setRolesData,
} from "../Auth";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null);
  const [roles, setRoles] = useState(null);
  const [userLoginToken, setUserLoginToken] = useState(null);

  const RolesDetail = async () => {
    try {
      const response = await getRoles();
      setRoles(response.data);
      setRolesData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (data) => {
    try {
      RolesDetail();
      const response = await loginUser(data);
      if (response.data) {
        setAuthToken(response?.data?.user?.id);
        const res = CheckPermission(response?.data?.user?.roleName, roles, response?.data?.permissions);
        setPermissionsData(res?.permissions);
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
        permissions,
        userLoginToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
