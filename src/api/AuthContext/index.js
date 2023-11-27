import React, { createContext, useState } from "react";
import { CheckPermission } from "../../utils/permissionsConfig";
import { getRoles, loginUser } from "../APIs";
import { useEffect } from "react";
import { setAuthToken, setPermissionsData, setRolesData } from "../Auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null);
  const [roles, setRoles] = useState(null);

  const RolesDetail = async () => {
    try {
      const response = await getRoles()
      setRoles(response.data)
      setRolesData(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    RolesDetail()
  }, [])

  const user = {
    role: 'HR',
    permissions: [
      {
        label: 'Roles',
        hasAccess: ["View", "Edit"]
      },
      {
        label: 'Users',
        hasAccess: ["View", "Delete"]
      },
      {
        label: 'Leave',
        hasAccess: ["View", "Delete"]
      }
    ]
  }

  const login = async () => {
    try {
      const response = await loginUser();
      if (response.data) {
        setAuthToken(response?.data?.token);
        const res = CheckPermission(response?.data?.user?.role, roles, response?.data?.user?.permissions);
        setPermissions(res?.permissions);
        setPermissionsData(res?.permissions);
      }
      console.log(response.data.token);
      console.log(response.data.user);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <AuthContext.Provider
      value={{
        login,
        permissions
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
