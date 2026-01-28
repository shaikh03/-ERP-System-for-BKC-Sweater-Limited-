import {
  SET_ERRORS,
  EMPLOYEE_LOGIN,
  UPDATE_PASSWORD,
  UPDATE_EMPLOYEE,
} from "../actionTypes";
import * as api from "../api";

export const employeeSignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.employeeSignIn(formData);
    dispatch({ type: EMPLOYEE_LOGIN, data });
    if (data.result.passwordUpdated) navigate("/employee/home");
    else navigate("/employee/password");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const employeeUpdatePassword =
  (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.employeeUpdatePassword(formData);
      dispatch({ type: UPDATE_PASSWORD, payload: true });
      alert("Password Updated");
      navigate("/employee/home");
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

export const updateEmployee = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateEmployee(formData);
    dispatch({ type: UPDATE_EMPLOYEE, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
