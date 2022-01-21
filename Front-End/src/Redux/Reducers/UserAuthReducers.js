
import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("userToken"),
  userData: null,
  loggedIn: false,
  registering: false,
  loggingIn: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SIGN_IN":
      //console.log("signing in:", payload)
      return {
        ...initialState,
        loggingIn: true,
        token: payload,
      };
    case "SIGN_UP":
      return {
        ...initialState,
        registering: true,
      };
    case "SIGNED_UP":
      return {
        ...initialState,
        token: payload,
        registering: false,
      };
    case "SIGN_UP_FAIL":
      return {
        ...initialState,
        registering: false,
      };
    case "SIGN_IN_FAIL":
      return {
        ...initialState,
        loggingIn: false,
      };
    case "USER_LOADING":
      //console.log("dfsdfsfs")
      return {
        ...initialState,
        loggingIn: true,
      };
    case "USER_LOADED":
      //console.log("dfsdfsfs")
      return {
        ...initialState,
        userData: payload,
        loggedIn: true,
        loggingIn: false,
      };
    case "SIGN_OUT":
      localStorage.removeItem("userToken");
      return {
        token: null,
        loggedIn: false,
        userData: null,
      };
    case "CHANGE_PASSWORD":
      return {
        token: null,
        loggedIn: false,
        userData: null,
      };
    default:
      return state;
  }
};

export default authReducer;