import Employee from "../models/employee.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const employeeLogin = async (req, res) => {
  const { username, password } = req.body;
  const errors = { usernameError: String, passwordError: String };
  try {
    const existingEmployee = await Employee.findOne({ username });
    if (!existingEmployee) {
      errors.usernameError = "Employee doesn't exist.";
      return res.status(404).json(errors);
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingEmployee.password
    );
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    const token = jwt.sign(
      {
        email: existingEmployee.email,
        id: existingEmployee._id,
      },
      "sEcReT",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingEmployee, token: token });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    const errors = { mismatchError: String };
    if (newPassword !== confirmPassword) {
      errors.mismatchError =
        "Your password and confirmation password do not match";
      return res.status(400).json(errors);
    }

    const employee = await Employee.findOne({ email });
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    employee.password = hashedPassword;
    await employee.save();
    if (employee.passwordUpdated === false) {
      employee.passwordUpdated = true;
      await employee.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: employee,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { name, dob, department, contactNumber, avatar, email, designation } =
      req.body;
    const updatedEmployee = await Employee.findOne({ email });
    if (name) {
      updatedEmployee.name = name;
      await updatedEmployee.save();
    }
    if (dob) {
      updatedEmployee.dob = dob;
      await updatedEmployee.save();
    }
    if (department) {
      updatedEmployee.department = department;
      await updatedEmployee.save();
    }
    if (contactNumber) {
      updatedEmployee.contactNumber = contactNumber;
      await updatedEmployee.save();
    }
    if (designation) {
      updatedEmployee.designation = designation;
      await updatedEmployee.save();
    }
    if (avatar) {
      updatedEmployee.avatar = avatar;
      await updatedEmployee.save();
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};
