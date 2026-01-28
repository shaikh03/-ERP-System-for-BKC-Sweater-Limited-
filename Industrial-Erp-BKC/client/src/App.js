import React from "react";
import { Routes, Route } from "react-router-dom";
import AddAdmin from "./components/admin/addAdmin/AddAdmin";
import AddDepartment from "./components/admin/addDepartment/AddDepartment";
import AddEmployee from "./components/admin/addEmployee/AddEmployee";
import AdminHome from "./components/admin/AdminHome";

import GetEmployee from "./components/admin/getEmployee/GetEmployee";
import AdminProfile from "./components/admin/profile/Profile";
import AdminFirstTimePassword from "./components/admin/profile/update/firstTimePassword/FirstTimePassword";
import AdminPassword from "./components/admin/profile/update/password/Password";

import AdminUpdate from "./components/admin/profile/update/Update";
import EmployeeHome from "./components/employee/EmployeeHome";
import EmployeeProfile from "./components/employee/profile/Profile";
import EmployeeFirstTimePassword from "./components/employee/profile/update/firstTimePassword/FirstTimePassword";
import EmployeePassword from "./components/employee/profile/update/password/Password";
import EmployeeUpdate from "./components/employee/profile/update/Update";
import AdminLogin from "./components/login/adminLogin/AdminLogin";
import EmployeeLogin from "./components/login/employeeLogin/EmployeeLogin";
import Login from "./components/login/Login";

import DeleteAdmin from "./components/admin/deleteAdmin/DeleteAdmin";
import DeleteDepartment from "./components/admin/deleteDepartment/DeleteDepartment";
import DeleteEmployee from "./components/admin/deleteEmployee/DeleteEmployee";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />

      {/* Admin  */}

      <Route path="/login/adminlogin" element={<AdminLogin />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/update" element={<AdminUpdate />} />
      <Route path="/admin/update/password" element={<AdminPassword />} />
      <Route
        path="/admin/updatepassword"
        element={<AdminFirstTimePassword />}
      />
      <Route path="/admin/addadmin" element={<AddAdmin />} />
      <Route path="/admin/deleteadmin" element={<DeleteAdmin />} />
      <Route path="/admin/adddepartment" element={<AddDepartment />} />
      <Route path="/admin/deletedepartment" element={<DeleteDepartment />} />
      <Route path="/admin/addemployee" element={<AddEmployee />} />
      <Route path="/admin/deleteemployee" element={<DeleteEmployee />} />
      <Route path="/admin/allemployee" element={<GetEmployee />} />

      {/* Employee  */}

      <Route path="/login/employeelogin" element={<EmployeeLogin />} />
      <Route path="/employee/home" element={<EmployeeHome />} />
      <Route
        path="/employee/password"
        element={<EmployeeFirstTimePassword />}
      />
      <Route path="/employee/profile" element={<EmployeeProfile />} />
      <Route path="/employee/update" element={<EmployeeUpdate />} />
      <Route path="/employee/update/password" element={<EmployeePassword />} />
    </Routes>
  );
};

export default App;
