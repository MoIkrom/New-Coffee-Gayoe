import {ActionType} from 'redux-promise-middleware';

const ACTION_STRING = {
  register: 'AUTH_REGISTER',
  login: 'AUTH_LOGIN',
  // forgot: 'AUTH_FORGOT',
  // reset: 'AUTH_RESET',
  // logout: 'AUTH_LOGOUT',
  profile: 'PROFILE',
  product: 'PRODUCT',
  // getUser: 'GET_USER',
  // getProduct: 'GET_PRODUCT',
  // getAll: 'GET_ALL',
  // getDetail: 'GET_DETAIL',
  // createTransaction: 'CREATE_TRANSACTION',
  // transactionData: 'TRANSACTION_DATA',
  // checkout: 'TRANSACTION_CHECKOUT',
  // payment: 'TRANSACTION_PAYMENT',
  // getHistory: 'GET_HISTORY',
  // ..............................
  // authLogin: 'AUTH_LOGIN',
  // authLogout: 'AUTH_LOGOUT',
  // profileLogout: 'PROFILE_LOGOUT',
  editProfile: 'EDIT_PROFILE',
  // getProfile: 'GET_PROFILE',
  // getHistory: "HISTORY",
  // getProducts: "GET_PRODUCTS",
  // editProduct: "EDIT_PRODUCTS",
  productDetail: 'PRODUCT_DETAIL',
  cartSubsctract: 'ADD_CART',
  checkoutItem: 'CHECKOUT_ITEM',
  addPayment: 'ADD_PAYMENT',
  // addProduct: "ADD_PRODUCT",
  // addPromo: "ADD_PROMO"

  // -----------------------------
  pending: `_${ActionType.Pending}`,
  fulfilled: `_${ActionType.Fulfilled}`,
  rejected: `_${ActionType.Rejected}`,
};

export default ACTION_STRING;
