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
  