import axios from 'axios';
const BaseUrl = `https://coffee-gayoe.vercel.app/`;
// const BaseUrl = process.env.BACKEND_URL;

// Axios register
export const Register = body => {
  return axios.post(`${BaseUrl}/users`, body);
};

// Axios Get user by id
export const userID = token => {
  return axios.get(`${BaseUrl}/users/UserID`, {
    headers: {
      'x-access-token': token,
    },
  });
};

// Axios Login
export const LoginUser = body => {
  return axios.post(`${BaseUrl}/auth`, body);
};

// Axios getHistory
export const getHistory = token => {
  return axios.get(
    `https://coffeeadictbe.vercel.app/coffee/transactions/history?page=1&limit=10`,
    {
      headers: {
        'x-access-token': token,
      },
    },
  );
};

// Axios Logout
export const Logout = token => {
  return axios.delete(`${BaseUrl}/auth`, {
    headers: {
      'x-access-token': token,
    },
  });
};

// Axios Transactions
export const transactions = (token, body) => {
  return axios.post(`${BaseUrl}api/v1/transactions`, body, {
    headers: {
      'x-access-token': token,
    },
  });
};

// Axios getHistory All
export const getHistoryAll = token => {
  return axios.get(`${BaseUrl}api/v1/transactions/history`, {
    headers: {
      'x-access-token': token,
    },
  });
};
// editProfile
export const editProfile = (token, body) => {
  return axios.patch(`${BaseUrl}api/v1/users`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token': token,
    },
  });
};

// Axios Delete historyid
export const deleteHistoryId = (token, id) => {
  return axios.delete(
    `https://coffeeadictbe.vercel.app/coffee/transactions/${id}`,
    {
      headers: {
        'x-access-token': token,
      },
    },
  );
};

// Axios reset password
export const Resetpassword = (token, body) => {
  return axios.patch(
    `https://coffeeadictbe.vercel.app/coffee/users/editPasswords`,
    body,
    {
      headers: {
        'x-access-token': token,
      },
    },
  );
};
