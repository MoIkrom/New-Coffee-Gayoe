import ACTION_STRING from './actionString';
import {Logout, userID, login} from '../../utils/auth';

// Action Login
const loginPending = () => ({
  type: ACTION_STRING.login.concat(ACTION_STRING.pending),
});

const loginRejected = error => ({
  type: ACTION_STRING.login.concat(ACTION_STRING.rejected),
  payload: {error},
});

const loginFulfilled = data => ({
  type: ACTION_STRING.login.concat(ACTION_STRING.fulfilled),
  payload: {data},
});

const loginThunk = (body, cbSuccess, cbDenied) => {
  return async dispatch => {
    try {
      dispatch(loginPending());
      const result = await login(body);
      dispatch(loginFulfilled(result.data));

      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(loginRejected(error));
      console.log(error);
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

// Action logout
const logoutPending = () => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.pending),
});

const logoutRejected = error => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.rejected),
  payload: {error},
});

const logoutFulfilled = data => ({
  type: ACTION_STRING.logout.concat(ACTION_STRING.fulfilled),
  payload: {data},
});

const logoutThunk = (body, cbSuccess, cbDenied) => {
  return async dispatch => {
    try {
      dispatch(logoutPending());
      const result = await Logout(body);
      dispatch(logoutFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(logoutRejected(error));
      // console.log(error);
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

// Action Get user by id
const profilePending = () => ({
  type: ACTION_STRING.profile.concat(ACTION_STRING.pending),
});

const profileRejected = error => ({
  type: ACTION_STRING.profile.concat(ACTION_STRING.rejected),
  payload: {error},
});

const profileFulfilled = data => ({
  type: ACTION_STRING.profile.concat(ACTION_STRING.fulfilled),
  payload: {data},
});

// Edit Profile
const editProfilePending = () => ({
  type: ACTION_STRING.editProfile.concat(ACTION_STRING.pending),
});

const editProfileRejected = error => ({
  type: ACTION_STRING.editProfile.concat(ACTION_STRING.rejected),
  payload: {error},
});

const editProfileFulfilled = data => ({
  type: ACTION_STRING.editProfile.concat(ACTION_STRING.fulfilled),
  payload: {data},
});

const userIDThunk = (token, navigate) => {
  return async dispatch => {
    try {
      dispatch(profilePending());
      const result = await userID(token);
      console.log(result.data);
      dispatch(profileFulfilled(result.data));
      if (typeof navigate === 'function') navigate();
    } catch (error) {
      console.log(error);
      dispatch(profileRejected(error));
    }
  };
};

// Action get data product to payment
const productFulfilled = data => ({
  type: ACTION_STRING.product.concat(ACTION_STRING.fulfilled),
  payload: {data},
});

const productThunk = (body, navigate) => {
  return async dispatch => {
    try {
      dispatch(productFulfilled(body));
      if (typeof navigate === 'function') navigate();
    } catch (error) {
      console.log(error);
    }
  };
};

const authAction = {
  logoutThunk,
  userIDThunk,
  productThunk,
  loginThunk,
};

export default authAction;

// ================================
// import ACTION_STRING from './actionString';
// import {register, login, forgot, reset, logout} from '../../utils/auth';

// // register
// const registerPending = () => ({
//   type: ACTION_STRING.register.concat(ACTION_STRING.pending),
// });

// const registerRejected = error => ({
//   type: ACTION_STRING.register.concat(ACTION_STRING.rejected),
//   payload: {error},
// });

// const registerFulfilled = data => ({
//   type: ACTION_STRING.register.concat(ACTION_STRING.fulfilled),
//   payload: {data},
// });

// // Login

// const loginPending = () => ({
//   type: ACTION_STRING.login.concat(ACTION_STRING.pending),
// });

// const loginRejected = error => ({
//   type: ACTION_STRING.login.concat(ACTION_STRING.rejected),
//   payload: {error},
// });

// const loginFulfilled = data => ({
//   type: ACTION_STRING.login.concat(ACTION_STRING.fulfilled),
//   payload: {data},
// });

// // Forgot
// const forgotPending = () => ({
//   type: ACTION_STRING.forgot.concat(ACTION_STRING.pending),
// });

// const forgotRejected = error => ({
//   type: ACTION_STRING.forgot.concat(ACTION_STRING.rejected),
//   payload: {error},
// });

// const forgotFulfilled = data => ({
//   type: ACTION_STRING.forgot.concat(ACTION_STRING.fulfilled),
//   payload: {data},
// });

// // Reset
// const resetPending = () => ({
//   type: ACTION_STRING.reset.concat(ACTION_STRING.pending),
// });

// const resetRejected = error => ({
//   type: ACTION_STRING.reset.concat(ACTION_STRING.rejected),
//   payload: {error},
// });

// const resetFulfilled = data => ({
//   type: ACTION_STRING.reset.concat(ACTION_STRING.fulfilled),
//   payload: {data},
// });

// // Logout
// const logoutPending = () => ({
//   type: ACTION_STRING.logout.concat(ACTION_STRING.pending),
// });

// const logoutRejected = error => ({
//   type: ACTION_STRING.logout.concat(ACTION_STRING.rejected),
//   payload: {error},
// });

// const logoutFulfilled = data => ({
//   type: ACTION_STRING.logout.concat(ACTION_STRING.fulfilled),
//   payload: {data},
// });

// // registerThunk
// const registerThunk = (body, cbSuccess, cbDenied) => {
//   return async dispatch => {
//     try {
//       dispatch(registerPending());
//       // console.log('redux', body);
//       const result = await register(body);
//       dispatch(registerFulfilled(result.data));
//       typeof cbSuccess === 'function' && cbSuccess();
//     } catch (error) {
//       dispatch(registerRejected(error));
//       // console.log(error);
//       typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
//     }
//   };
// };

// // loginThunk
// const loginThunk = (body, cbSuccess, cbDenied) => {
//   return async dispatch => {
//     try {
//       dispatch(loginPending());
//       // console.log('redux', body);
//       const result = await login(body);
//       dispatch(loginFulfilled(result.data));
//       typeof cbSuccess === 'function' && cbSuccess();
//     } catch (error) {
//       dispatch(loginRejected(error));
//       // console.log(error);
//       typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
//     }
//   };
// };

// // forgotThunk
// const forgotThunk = (body, cbSuccess, cbDenied) => {
//   return async dispatch => {
//     try {
//       dispatch(forgotPending());
//       console.log('redux', body);
//       const result = await forgot(body);
//       dispatch(forgotFulfilled(result.data));
//       typeof cbSuccess === 'function' && cbSuccess();
//     } catch (error) {
//       dispatch(forgotRejected(error));
//       console.log(error);
//       typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
//     }
//   };
// };

// // resetThunk
// const resetThunk = (body, cbSuccess, cbDenied) => {
//   return async dispatch => {
//     try {
//       dispatch(resetPending());
//       console.log('redux', body);
//       const result = await reset(body);
//       dispatch(resetFulfilled(result.data));
//       typeof cbSuccess === 'function' && cbSuccess();
//     } catch (error) {
//       dispatch(resetRejected(error));
//       console.log(error);
//       typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
//     }
//   };
// };

// // logoutThunk
// const logoutThunk = (token, cbSuccess, cbDenied) => {
//   return async dispatch => {
//     try {
//       dispatch(logoutPending());
//       console.log('redux', token);
//       const result = await logout(token);
//       dispatch(logoutFulfilled(result.data));
//       typeof cbSuccess === 'function' && cbSuccess();
//     } catch (error) {
//       dispatch(logoutRejected(error));
//       console.log(error);
//       typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
//     }
//   };
// };

// const authAction = {
//   registerThunk,
//   loginThunk,
//   forgotThunk,
//   resetThunk,
//   logoutThunk,
// };

// export default authAction;
