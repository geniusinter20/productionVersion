
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
    case "UPDATE_INFO":
      //console.log("signing in:", payload)
      return {
        ...state,
        userData: payload,
      };
    case "UPDATE_IMAGE":
      //console.log("signing in:", payload)
      return {
        ...state,
        userData: {...state.userData, imageID:payload},
      };
    case "SIGN_IN":
      //console.log("signing in:", payload)
      return {
        ...state,
        loggingIn: true,
        token: payload,
      };
    case "SIGN_UP":
      return {
        ...state,
        registering: true,
      };
    case "SIGNED_UP":
      return {
        ...state,
        token: payload,
        registering: false,
      };
    case "SIGN_UP_FAIL":
      return {
        ...state,
        registering: false,
      };
    case "SIGN_IN_FAIL":
      return {
        ...state,
        loggingIn: false,
      };
    case "USER_LOADING":
      //console.log("dfsdfsfs")
      return {
        ...state,
        loggingIn: true,
      };
    case "USER_LOADED":
      //console.log("dfsdfsfs")
      return {
        ...state,
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