export const setAuthToken = (token) => {
  localStorage.setItem('userToken', token);
};

export const getAuthToken = () => {
  const authToken = localStorage.getItem('userToken');
  return authToken;
};

export const logout = () => {
  localStorage.removeItem('userToken');
};


// Roles
export const setRolesData = (data) => {
  localStorage.setItem('roles', data);
};

export const getRolesData = () => {
  const Data = localStorage.getItem('roles');
  return Data;
};

// Permissions
export const setPermissionsData = (data) => {
  localStorage.setItem('permissions', data);
};

export const getPermissionsData = () => {
  const Data = localStorage.getItem('permissions');
  return Data;
};