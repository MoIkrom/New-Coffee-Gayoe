import {ActionType} from 'redux-promise-middleware';

const ACTION_STRING = {
  register: 'AUTH_REGISTER',
  login: 'AUTH_LOGIN',
  forgot: 'AUTH_FORGOT',
  reset: 'AUTH_RESET',
  logout: 'AUTH_LOGOUT',
  getUser: 'GET_USER',
  getProduct: 'GET_PRODUCT',
  getAll: 'GET_ALL',
  getDetail: 'GET_DETAIL',
  createTransaction: 'CREATE_TRANSACTION',
  transactionData: 'TRANSACTION_DATA',
  checkout: 'TRANSACTION_CHECKOUT',
  payment: 'TRANSACTION_PAYMENT',
  getHistory: 'GET_HISTORY',
  pending: `_${ActionType.Pending}`,
  fulfilled: `_${ActionType.Fulfilled}`,
  rejected: `_${ActionType.Rejected}`,
};

export default ACTION_STRING;
