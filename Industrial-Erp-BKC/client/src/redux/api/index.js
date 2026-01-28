import axios from "axios";

// const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });
const API = axios.create({ baseURL: "http://localhost:5001/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }
  return req;
});

// Admin

export const adminSignIn = (formData) => API.post("/api/admin/login", formData);

export const adminUpdatePassword = (updatedPassword) =>
  API.post("/api/admin/updatepassword", updatedPassword);

export const getAllEmployee = () => API.get("/api/admin/getallemployee");

export const getAllAdmin = () => API.get("/api/admin/getalladmin");

export const getAllDepartment = () => API.get("/api/admin/getalldepartment");

export const updateAdmin = (updatedAdmin) =>
  API.post("/api/admin/updateprofile", updatedAdmin);

export const addAdmin = (admin) => API.post("/api/admin/addadmin", admin);
export const deleteAdmin = (data) => API.post("/api/admin/deleteadmin", data);
export const deleteEmployee = (data) =>
  API.post("/api/admin/deleteemployee", data);
export const deleteDepartment = (data) =>
  API.post("/api/admin/deletedepartment", data);

export const getAdmin = (admin) => API.post("/api/admin/getadmin", admin);

export const addDepartment = (department) =>
  API.post("/api/admin/adddepartment", department);

export const addEmployee = (employee) =>
  API.post("/api/admin/addemployee", employee);

export const getEmployee = (department) =>
  API.post("/api/admin/getemployee", department);

// Employee

export const employeeSignIn = (formData) =>
  API.post("/api/employee/login", formData);

export const employeeUpdatePassword = (updatedPassword) =>
  API.post("/api/employee/updatepassword", updatedPassword);

export const updateEmployee = (updatedEmployee) =>
  API.post("/api/employee/updateprofile", updatedEmployee);
