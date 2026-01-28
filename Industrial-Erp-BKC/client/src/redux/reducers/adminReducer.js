import {
  ADD_ADMIN,
  ADD_EMPLOYEE,
  ADMIN_LOGIN,
  GET_EMPLOYEE,
  LOGOUT,
  UPDATE_ADMIN,
  ADD_DEPARTMENT,
  GET_ALL_EMPLOYEE,
  GET_ALL_ADMIN,
  GET_ALL_DEPARTMENT,
  UPDATE_PASSWORD,
  GET_ADMIN,
  DELETE_ADMIN,
  DELETE_DEPARTMENT,
  DELETE_EMPLOYEE,
} from "../actionTypes";

const initialState = {
  authData: null,
  updatedPassword: false,
  updatedAdmin: false,
  adminAdded: false,
  departmentAdded: false,
  employeeAdded: false,
  allEmployee: [],
  allAdmin: [],
  allDepartment: [],
  employees: [],
  admins: [],
  adminDeleted: false,
  departmentDeleted: false,
  employeeDeleted: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    case UPDATE_PASSWORD:
      return {
        ...state,
        updatedPassword: action.payload,
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        updatedAdmin: action.payload,
      };
    case ADD_ADMIN:
      return {
        ...state,
        adminAdded: action.payload,
      };
    case DELETE_ADMIN:
      return {
        ...state,
        adminDeleted: action.payload,
      };
    case DELETE_DEPARTMENT:
      return {
        ...state,
        departmentDeleted: action.payload,
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employeeDeleted: action.payload,
      };
    case ADD_DEPARTMENT:
      return {
        ...state,
        departmentAdded: action.payload,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employeeAdded: action.payload,
      };
    case GET_EMPLOYEE:
      return {
        ...state,
        employees: action.payload,
      };
    case GET_ADMIN:
      return {
        ...state,
        admins: action.payload,
      };
    case GET_ALL_EMPLOYEE:
      return {
        ...state,
        allEmployee: action.payload,
      };
    case GET_ALL_ADMIN:
      return {
        ...state,
        allAdmin: action.payload,
      };
    case GET_ALL_DEPARTMENT:
      return {
        ...state,
        allDepartment: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
