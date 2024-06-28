// // Function to set token and its expiration time in localStorage
// export const setToken = (token) => {
//   const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours in milliseconds
//   localStorage.setItem('token', token);
//   localStorage.setItem('tokenExpiration', expirationTime);
// };

// // Function to get the token from localStorage
// export const getToken = () => {
//   const token = localStorage.getItem('token');
//   const expirationTime = localStorage.getItem('tokenExpiration');

//   if (!token || !expirationTime) {
//     return null; // No token or expiration time found
//   }

//   // Check if the token is expired
//   if (new Date().getTime() > parseInt(expirationTime, 10)) {
//     // Token is expired
//     return null;
//   }

//   return token;
// };

// // Function to remove token and its expiration time from localStorage
// export const removeToken = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('tokenExpiration');
// };

export const setAuthToken = (token) => {
  localStorage.setItem("userToken", JSON.stringify(token));
};

export const getAuthToken = () => {
  const authToken = localStorage.getItem("userToken");
  return authToken && JSON.parse(authToken);
};

export const setUserData = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};

export const getUserData = () => {
  const userData = localStorage.getItem("userData");
  return userData && JSON.parse(userData);
};

export const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("roles");
  localStorage.removeItem("permissions");
  localStorage.removeItem("userData");
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

export const setregisterID = (id) => {
  localStorage.setItem("registerid", id);
};

export const getRegisterID = (id) => {
  return localStorage.getItem("registerid", id);
};

export const setSelectedFileID = (data) => {
  localStorage.setItem("fileID", JSON.stringify(data));
};

export const getSelectedFileID = () => {
  const Data = localStorage.getItem("fileID");
  return Data && JSON.parse(Data);
};

export const setFileIdForDetailPage = (id) => {
  localStorage.setItem("fileIdDetail", id);
};

export const getFileIdForDetailPage = (id) => {
  return localStorage.getItem("fileIdDetail", id);
};

export const setCaseIdForDetailPage = (id) => {
  localStorage.setItem("caseIdDetail", id);
};

export const getCaseIdForDetailPage = (id) => {
  return localStorage.getItem("caseIdDetail", id);
};