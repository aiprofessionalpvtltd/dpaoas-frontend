export const setAuthToken = (token) => {
  localStorage.setItem("userToken", JSON.stringify(token));
};

export const getAuthToken = () => {
  const authToken = localStorage.getItem("userToken");
  return authToken && JSON.parse(authToken);
};

export const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("roles");
  localStorage.removeItem("permissions");
};

// Roles
export const setRolesData = (data) => {
  localStorage.setItem("roles", JSON.stringify(data));
};

export const getRolesData = () => {
  const Data = localStorage.getItem("roles");
  return Data && JSON.parse(Data);
};

// Permissions
export const setPermissionsData = (data) => {
  localStorage.setItem("permissions", JSON.stringify(data));
};

export const getPermissionsData = () => {
  const Data = localStorage.getItem("permissions");
  return Data && JSON.parse(Data);
};

//Pass Id
export const setPassID = (id) => {
  localStorage.setItem("passid", id);
};

export const getPassID = (id) => {
  return localStorage.getItem("passid", id);
};
