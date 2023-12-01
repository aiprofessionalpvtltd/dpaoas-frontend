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
  useEffect(() => {
    RolesDetail();
  }, []);

  // Check the local storage for the token and the user on initial render
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      // Set the state with the stored values
      setUserLoginToken(token);
    }
  }, [getAuthToken, userLoginToken]);

  const user = {
    role: "HR",
    permissions: [
      {
        label: "Roles",
        hasAccess: ["View", "Edit"],
      },
      {
        label: "Users",
        hasAccess: ["View", "Delete"],
      },
      {
        label: "Leave",
        hasAccess: ["View", "Delete"],
      },
    ],
  };

  const login = async (data) => {
    try {
      const response = await loginUser(data);
      if (response.data) {
        setAuthToken(response?.data?.user?.id);
        // const res = CheckPermission(response?.data?.user?.role, roles, response?.data?.user?.permissions);
        // setPermissions(res?.permissions);
        // setPermissionsData(res?.permissions);
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
