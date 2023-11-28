import React, { createContext, useState } from "react";
import { CheckPermission } from "../../utils/permissionsConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null);
  // const [roles, setRoles] = useState(null);
  const roles = null

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
      }
    ]
  }

  const login = () => {
    const res = CheckPermission(user.role, roles, user.permissions);
    setPermissions(res?.permissions);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        permissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
