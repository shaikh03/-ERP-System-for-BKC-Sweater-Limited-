import express from "express";
import {
  employeeLogin,
  updatedPassword,
  updateEmployee,
} from "../controller/employeeController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", employeeLogin);
router.post("/updatepassword", auth, updatedPassword);
router.post("/updateprofile", auth, updateEmployee);

export default router;
