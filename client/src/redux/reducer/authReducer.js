import jwtDecode from "jwt-decode";
import { authTypes, authRegisterTypes } from "../types/authTypes";

const token = localStorage.getItem("token");

const getPayloadFromToken = (token) => {
  const encodedPayload = jwtDecode(token);

  return encodedPayload;
};

const initialState = {
  authenticated: token === null ? false : true,
  isAdmin: token === null ? false : getPayloadFromToken(token).isAdmin,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGIN_USER:
    case authRegisterTypes.REGISTER_USER:
      localStorage.setItem("token", action.payload);
      const decode = jwtDecode(action.payload);
      return {
        ...state,
        authenticated: true,
        isAdmin: decode.isAdmin,
      };
    case authTypes.LOGIN_ERROR:
    case authRegisterTypes.REGISTER_ERROR:
      return {
        ...state,
        authenticated: false,
        error: action.payload,
      };
    case authTypes.LOGOUT_USER:
      localStorage.removeItem("token");
      localStorage.clear();
      return {
        ...state,
        authenticated: false,
        isAdmin: false,
      };
    case authTypes.CLEAR_ERROR:
    case authRegisterTypes.CLEAR_REGISTER_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
