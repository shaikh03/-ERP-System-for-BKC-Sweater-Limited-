import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import errorReducer from "./errorReducer";
import employeeReducer from "./employeeReducer";

export default combineReducers({
  admin: adminReducer,
  errors: errorReducer,
  employee: employeeReducer,
});
