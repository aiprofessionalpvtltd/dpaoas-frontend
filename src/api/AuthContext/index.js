import React, { createContext } from "react";
import { CheckPermission } from "../../utils/permissionsConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
    const res = CheckPermission(user.role, user.permissions);
    console.log(res);
  }

  return (
    <AuthContext.Provider
      value={{
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
