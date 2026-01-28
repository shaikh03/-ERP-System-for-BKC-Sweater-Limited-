import express from "express";
import auth from "../middleware/auth.js";
import {
  adminLogin,
  updateAdmin,
  addAdmin,
  addEmployee,
  getEmployee,
  addDepartment,
  getAllEmployee,
  getAllAdmin,
  getAllDepartment,
  updatedPassword,
  getAdmin,
  deleteAdmin,
  deleteDepartment,
  deleteEmployee,
} from "../controller/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/updatepassword", auth, updatedPassword);
router.get("/getallemployee", auth, getAllEmployee);
router.get("/getalldepartment", auth, getAllDepartment);
router.get("/getalladmin", auth, getAllAdmin);
router.post("/updateprofile", auth, updateAdmin);
router.post("/addadmin", auth, addAdmin);
router.post("/adddepartment", auth, addDepartment);
router.post("/addemployee", auth, addEmployee);
router.post("/getemployee", auth, getEmployee);
router.post("/getadmin", auth, getAdmin);
router.post("/deleteadmin", auth, deleteAdmin);
router.post("/deleteemployee", auth, deleteEmployee);
router.post("/deletedepartment", auth, deleteDepartment);

export default router;
