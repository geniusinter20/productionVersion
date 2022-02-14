import axios from "axios";
import jwtDecode from "jwt-decode";
import { message } from "antd";
export const signUp = (user) => {
  //console.log(user)
  return (dispatch) => {
    dispatch({
      type: "SIGN_UP",
    });
    axios
      .post(`https://exporagenius.com:5000/client/register`, user)
      .then((token) => {
        if (token.data.msg) {
          dispatch({
            type: "SIGN_UP_FAIL",
          });
          message.error({ content: token.data.msg, className: "message" });
        }
        else {
          localStorage.setItem("userToken", token.data);
          dispatch({
            type: "SIGNED_UP",
            payload: token.data,
          });
          message.success({ content: "Registration Completed", className: "message" });
          dispatch(loadUser(token.data))
        }
        //console.log("token", token.data.msg)
      })
      .catch((error) => {
        console.log(error.response);
        dispatch({
          type: "SIGN_UP_FAIL",
        });
      });
  };
};

export const signIn = (email, password) => {

  return (dispatch) => {
    dispatch({
      type: "SIGN_IN",
    });
    axios.post(`https://exporagenius.com:5000/client/login`, { email, password })
      .then(({ data }) => {
        //console.log(data);
        if (data.msg) {
          message.error({ content: data.msg, className: "message" });
          dispatch({
            type: "SIGN_IN_FAIL",
          });
        }
        else {
          localStorage.setItem("userToken", data);
          dispatch({
            type: "SIGN_IN",
            payload: data,
          });
          dispatch(loadUser(data))
        }
      }).catch((error) => {
        dispatch({
          type: "SIGN_IN_FAIL",
        });
      })
  };
}
export const changePassword = (currentPassword, newPassword, email, userID) => {
  localStorage.removeItem("userToken")
  return (dispatch) => {
    let promiseA = axios.post(`https://exporagenius.com:5000/changepassword/${userID}`, { currentPassword, newPassword })
    let promiseB = promiseA.then(({ data }) => {
      //console.log("firstResponse:",data)
      console.log(data);
      if (data.msg) {
        message.error({ content: data.msg, className: "message" });
        return null;
      }
      message.success({ content: "Password Changed", className: "message" });
      axios
        .post(`https://exporagenius.com:5000/client/login`, { email: email, password: newPassword })
        .then(({ data }) => {
          localStorage.setItem("userToken", data);

        })
    })
    return Promise.all([promiseA, promiseB]).then(function ([responseA, responseB]) { });
  };
}

export const updateImage = (imageID) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_IMAGE",
      payload: imageID,
    });
  };
};
export const updateInfo = (userData) => {
  return (dispatch) => {
    axios
      .post(`https://exporagenius.com:5000/client/updateinfo/${userData._id}`, userData)
      .then(({ data }) => {
        //console.log(data);
        if (data.msg === "Updating Success") {
          message.success({ content: data.msg, className: "message" });
          dispatch({
            type: "UPDATE_INFO",
            payload: userData,
          });
        }

      })
  };
};
export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "SIGN_OUT",
    });
  };
};

export const loadUser = (tok) => {
  return (dispatch, getState) => {
    dispatch({
      type: "USER_LOADING",
    });
    const token = tok ? tok : getState().auth.token;
    if (token) {
      //console.log("user loading");
      axios
        .get(`https://exporagenius.com:5000/client/login`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }).then(({ data }) => {
            //console.log("data", data)
            dispatch({
              type: "USER_LOADED",
              payload: data[0],
            });
          }).catch((error) => {
            console.log(error);
            dispatch({
              type: "SIGN_IN_FAIL",
            });
          })
    } else {
      dispatch({
        type: "SIGN_IN_FAIL",
      });
      return null
    };
  };
};