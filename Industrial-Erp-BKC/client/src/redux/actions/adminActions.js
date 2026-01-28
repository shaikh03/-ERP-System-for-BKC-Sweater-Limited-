import {
  ADMIN_LOGIN,
  UPDATE_ADMIN,
  ADD_ADMIN,
  ADD_DEPARTMENT,
  ADD_EMPLOYEE,
  GET_ALL_EMPLOYEE,
  GET_EMPLOYEE,
  GET_ALL_ADMIN,
  GET_ALL_DEPARTMENT,
  SET_ERRORS,
  UPDATE_PASSWORD,
  DELETE_ADMIN,
  DELETE_DEPARTMENT,
  DELETE_EMPLOYEE,
} from "../actionTypes";
import * as api from "../api";

export const adminSignIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.adminSignIn(formData);
    dispatch({ type: ADMIN_LOGIN, data });
    if (data.result.passwordUpdated) navigate("/admin/home");
    else navigate("/admin/update/password");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const adminUpdatePassword = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.adminUpdatePassword(formData);
    dispatch({ type: UPDATE_PASSWORD, payload: true });
    alert("Password Updated");
    navigate("/admin/home");
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllEmployee = () => async (dispatch) => {
  try {
    const { data } = await api.getAllEmployee();
    dispatch({ type: GET_ALL_EMPLOYEE, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
export const getAllAdmin = () => async (dispatch) => {
  try {
    const { data } = await api.getAllAdmin();
    dispatch({ type: GET_ALL_ADMIN, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.getAdmin(formData);
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllDepartment = () => async (dispatch) => {
  try {
    const { data } = await api.getAllDepartment();
    dispatch({ type: GET_ALL_DEPARTMENT, payload: data });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateAdmin(formData);
    dispatch({ type: UPDATE_ADMIN, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addAdmin(formData);
    alert("Admin Added Successfully");
    dispatch({ type: ADD_ADMIN, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const deleteAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteAdmin(formData);
    alert("Admin Deleted");
    dispatch({ type: DELETE_ADMIN, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const deleteEmployee = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteEmployee(formData);
    alert("Employee Deleted");
    dispatch({ type: DELETE_EMPLOYEE, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const deleteDepartment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteDepartment(formData);
    alert("Department Deleted");
    dispatch({ type: DELETE_DEPARTMENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const addDepartment = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addDepartment(formData);
    alert("Department Added Successfully");
    dispatch({ type: ADD_DEPARTMENT, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addEmployee = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addEmployee(formData);
    alert("Employee Added Successfully");
    dispatch({ type: ADD_EMPLOYEE, payload: true });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getEmployee = (department) => async (dispatch) => {
  try {
    const { data } = await api.getEmployee(department);
    dispatch({ type: GET_EMPLOYEE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
