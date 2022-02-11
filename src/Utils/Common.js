// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token')  || null;
}

// remove the token and user from the session storage
export const removeUserSession = (setLoged) => {
  
  sessionStorage.removeItem('token');
  setLoged("Login")
}

// set the token and user from the session storage
export const setUserSession = (token) => {
  sessionStorage.setItem('token', token);
    
}

