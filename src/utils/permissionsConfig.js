import React from "react";

export const CheckPermission = (role, roles, permissions) => {
  const roleNames = roles?.map(role => role.name);
  const modulePermissions = {};

  permissions.forEach((module) => {
    if (roleNames?.includes(role)) {
      modulePermissions[module.label] = {
        canView: module.hasAccess.includes("View"),
        canEdit: module.hasAccess.includes("Edit"),
        canDelete: module.hasAccess.includes("Delete"),
        canCreate: module.hasAccess.includes("Add"),
      };
    }
  });

  return { permissions: modulePermissions };
};
