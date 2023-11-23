export const CheckPermission = (role, permissions) => {
    const roles = ['HR', 'Admin', 'SuperAdmin'];
    const modulePermissions = {};

    permissions.forEach((module) => {
        if (roles.includes(role)) {
            modulePermissions[module.label] = {
                canView: module.hasAccess.includes('View'),
                canEdit: module.hasAccess.includes('Edit'),
                canDelete: module.hasAccess.includes('Delete'),
                canCreate: module.hasAccess.includes('Create'),
            };
        }
    });

    return { permissions: modulePermissions };
};