import {
  EMPLOYEE_LOGIN,
  LOGOUT,
  UPDATE_EMPLOYEE,
  UPDATE_PASSWORD,
} from "../actionTypes";

const initialState = {
  authData: null,
  updatedPassword: false,
  updatedEmployee: false,
  testAdded: false,
  marksUploaded: false,
  attendanceUploaded: false,
  tests: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_LOGIN:
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
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        updatedEmployee: action.payload,
      };

    default:
      return state;
  }
};

export default employeeReducer;
