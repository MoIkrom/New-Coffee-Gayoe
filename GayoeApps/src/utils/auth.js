import axios from 'axios';

const BaseUrl = process.env.BACKEND_URL;

const config = token => {
  return {
    headers: {
      'x-access-token': `${token}`,
    },
  };
};

// Register
export const register = body => {
  const URL = `${BaseUrl}api/v1/users`;
  // console.log('util', URL);
  return axios.post(URL, body);
};

export const userID = token => {
  return axios.get(`https://coffee-gayoe.vercel.app/api/v1/users/profile`, {
    headers: {
      'x-access-token': token,
    },
  });
};

// Login
export const login = body => {
  const URL = `${BaseUrl}api/v1/auth`;
  // console.log('util', body);
  return axios.post(URL, body);
};

// Forgot
// export const forgot = body => {
//   const URL = `${BaseUrl}api/auths/forgot-password`;
//   // console.log('util', body);
//   return axios.patch(URL, body);
// };

// Reset
// export const reset = body => {
//   const URL = `${BaseUrl}api/auths/reset-password`;
//   // console.log('util', body);
//   return axios.patch(URL, body);
// };

// Logout
// export const logout = token => {
//   const URL = `${BaseUrl}api/auths/logout`;
//   // console.log('util', body);
//   return axios.delete(URL, config(token));
// };
