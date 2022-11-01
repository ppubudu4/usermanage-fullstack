import jwtDecode from "jwt-decode";
import axiosHttp from "../../http/axioshttp";
import { authTypes, authRegisterTypes } from "../types/authTypes";

export const login = (data) => async (dispatch) => {
  try {
    const response = await axiosHttp.post(`/api/login`, data);
    dispatch({
      type: authTypes.LOGIN_USER,
      payload: response.data.token,
    });
  } catch (error) {
    dispatch({
      type: authTypes.LOGIN_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const clearLoginError = () => async (dispatch) => {
  dispatch({ type: authTypes.CLEAR_ERROR });
};

export const logout = (navigate) => async (dispatch) => {
  dispatch({ type: authTypes.LOGOUT_USER });
};

export const register = (data, navigate) => async (dispatch) => {
  try {
    const response = await axiosHttp.post("/api/register", data);
    await localStorage.setItem("token", response.data.token);
    dispatch({ type: authRegisterTypes.REGISTER_USER });
    navigate("/");
  } catch (error) {
    dispatch({
      type: authRegisterTypes.REGISTER_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const clearRegisterError = () => async (dispatch) => {
  dispatch({ type: authRegisterTypes.CLEAR_REGISTER_ERROR });
};
