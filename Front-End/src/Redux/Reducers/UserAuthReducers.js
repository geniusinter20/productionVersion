
import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("userToken"),
  userData: null,
  loggedIn: false
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SIGN_IN":
      //console.log("signing in:", payload)
      return {
        ...initialState,
        token: payload
      };
    case "SIGN_UP":
      return {
        ...initialState,
        token: payload
      };
    case "USER_LOADED":
      //console.log("dfsdfsfs")
      return {
        ...initialState,
        userData: payload,
        loggedIn: true,
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