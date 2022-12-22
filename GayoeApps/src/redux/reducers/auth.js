import ACTION_STRING from '../actions/actionString';

const initialState = {
  isError: false,
  isLoading: false,
  isFulfilled: false,
  error: null,
  // userData: {
  //   token: null,
  //   role: null,
  //   email: null,
  // },
  profile: {
    email: null,
    phone_number: null,
    display_name: null,
    firstname: null,
    lastname: null,
    role: null,
    // username: null,
    gender: null,
    birthday: null,
    addres: null,
    image: `https://res.cloudinary.com/dx7cvqczn/image/upload/v1667811029/coffee_addict/pic_default.png`,
  },
  product: {
    id: null,
    product_name: null,
    price: 0,
    stock: 0,
    size: null,
    category: null,
    image: null,
    description: null,
    status: null,
    shiping: null,
    total: 0,
    qty: null,
    id_promo: null,
    // payment_method: null,
  },
};

const authReducer = (prevState = initialState, {type, payload}) => {
  const {
    product,
    login,
    logout,
    editProfile,
    profile,
    pending,
    rejected,
    fulfilled,
  } = ACTION_STRING;

  switch (type) {
    // login
    case login + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
        error: null,
      };

    case login + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        error: payload.error.response.data.msg,
      };

    case login + fulfilled:
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        error: null,
        userData: {
          token: payload.result.data.token,
          role: payload.result.data.role,
          email: payload.result.data.email,
        },
      };

    // profile
    case profile + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
        error: null,
      };
    case profile + rejected:
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        isFulfilled: false,
        error: payload.error.response.data.msg,
      };
    case profile + fulfilled:
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        error: null,
        profile: {
          email: payload.data.result.result[0].email,
          role: payload.data.result.result[0].role,
          phone_number: payload.data.result.result[0].phone_number,
          display_name: payload.data.result.result[0].display_name,
          firstname: payload.data.result.result[0].firstname,
          lastname: payload.data.result.result[0].lastname,
          gender: payload.data.result.result[0].gender,
          // birthday: payload.data.result[0].birthday,
          addres: payload.data.result.result[0].addres,
          image: payload.data.result.result[0].image,
        },
      };

    // Edit Profile
    case editProfile + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case editProfile + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        error: payload.error,
      };
    case editProfile + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        isLoggedIn: true,
        profile: {...prevState.profile, ...payload.data.data},
      };

    // product
    case product + fulfilled:
      return {
        ...prevState,
        isError: false,
        isFulfilled: true,
        isLoading: false,
        error: null,
        product: {
          id: payload.data.id,
          product_name: payload.data.product_name,
          price: payload.data.price,
          stock: payload.data.stock,
          size: payload.data.size,
          category: payload.data.category,
          image: payload.data.image,
          description: payload.data.description,
          status: payload.data.status,
          shiping: payload.data.shiping,
          total: payload.data.subTotal,
          qty: payload.data.qty,

          // id_product: payload.data.id_product,
          // product_name: payload.data.name_product,
          // price: payload.data.price,
          // size: payload.data.size,
          // image: payload.data.image,
          // status: payload.data.status,
          // delivery: payload.data.delivery,
          // total: payload.data.total,
          // qty: payload.data.qty,
          // payment_method: payload.data.payment_method,
          // id_promo: payload.data.id_promo,
        },
      };

    // logout
    case logout + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };
    case logout + rejected:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        error: payload.error.response.data.msg,
      };

    case logout + fulfilled:
      return initialState;

    default:
      return prevState;
  }
};

export default authReducer;

// ===================================================
// import ACTION_STRING from '../actions/actionString';

// const initialState = {
//   userData: {
//     id: null,
//     token: null,
//   },
//   isLoading: false,
//   isError: false,
//   isFulfilled: false,
//   error: null,
// };

// const authReducer = (prevState = initialState, {type, payload}) => {
//   const {register, login, forgot, reset, logout, pending, rejected, fulfilled} =
//     ACTION_STRING;
//   switch (type) {
//     // Register
//     case register + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isError: false,
//         isFulfilled: false,
//       };
//     case register + rejected:
//       return {
//         ...prevState,
//         isError: true,
//         isLoading: false,
//         error: payload.error,
//       };
//     case register + fulfilled:
//       return {
//         ...prevState,
//         isLoading: false,
//       };

//     //   Login
//     case login + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isError: false,
//         isFulfilled: false,
//       };
//     case login + rejected:
//       return {
//         ...prevState,
//         isError: true,
//         isLoading: false,
//         isFulfilled: false,
//         userData: {
//           id: null,
//           token: null,
//         },
//         error: payload.error,
//       };
//     case login + fulfilled:
//       return {
//         ...prevState,
//         isError: false,
//         isLoading: false,
//         isFulfilled: true,
//         userData: {
//           id: payload.data.data.payload.id,
//           token: payload.data.data.token,
//         },
//       };

//     //  Forgot
//     case forgot + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isError: false,
//         isFulfilled: false,
//       };
//     case forgot + rejected:
//       return {
//         ...prevState,
//         isError: true,
//         isLoading: false,
//         isFulfilled: false,
//         error: payload.error,
//       };
//     case forgot + fulfilled:
//       return {
//         ...prevState,
//         isError: false,
//         isLoading: false,
//         isFulfilled: true,
//       };

//     //   Reset
//     case reset + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isError: false,
//         isFulfilled: false,
//       };
//     case reset + rejected:
//       return {
//         ...prevState,
//         isError: true,
//         isLoading: false,
//         isFulfilled: false,
//         error: payload.error,
//       };
//     case reset + fulfilled:
//       return {
//         ...prevState,
//         isError: false,
//         isLoading: false,
//         isFulfilled: true,
//       };

//     //   Logout
//     case logout + pending:
//       return {
//         ...prevState,
//         isLoading: true,
//         isError: false,
//         isFulfilled: false,
//       };
//     case logout + rejected:
//       return {
//         ...prevState,
//         isError: true,
//         isLoading: false,
//         isFulfilled: false,
//         error: payload.error,
//       };
//     case logout + fulfilled:
//       return initialState;

//     default:
//       return prevState;
//   }
// };

// export default authReducer;
