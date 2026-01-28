import Admin from "../models/admin.js";
import Department from "../models/department.js";
import Employee from "../models/employee.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const errors = { usernameError: String, passwordError: String };
  try {
    const existingAdmin = await Admin.findOne({ username });
    if (!existingAdmin) {
      errors.usernameError = "Admin doesn't exist.";
      return res.status(404).json(errors);
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    const token = jwt.sign(
      {
        email: existingAdmin.email,
        id: existingAdmin._id,
      },
      "sEcReT",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingAdmin, token: token });
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

    const admin = await Admin.findOne({ email });
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();
    if (admin.passwordUpdated === false) {
      admin.passwordUpdated = true;
      await admin.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: admin,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};
export const updateAdmin = async (req, res) => {
  try {
    const { name, dob, department, contactNumber, avatar, email } = req.body;
    const updatedAdmin = await Admin.findOne({ email });
    if (name) {
      updatedAdmin.name = name;
      await updatedAdmin.save();
    }
    if (dob) {
      updatedAdmin.dob = dob;
      await updatedAdmin.save();
    }

    if (department) {
      updatedAdmin.department = department;
      await updatedAdmin.save();
    }
    if (contactNumber) {
      updatedAdmin.contactNumber = contactNumber;
      await updatedAdmin.save();
    }
    if (avatar) {
      updatedAdmin.avatar = avatar;
      await updatedAdmin.save();
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const addAdmin = async (req, res) => {
  try {
    const { name, dob, department, contactNumber, avatar, email, joiningYear } =
      req.body;
    const errors = { emailError: String };
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      errors.emailError = "Email already exists";
      return res.status(400).json(errors);
    }
    const existingDepartment = await Department.findOne({ department });
    let departmentHelper = existingDepartment.departmentCode;
    const admins = await Admin.find({ department });

    let helper;
    if (admins.length < 10) {
      helper = "00" + admins.length.toString();
    } else if (admins.length < 100 && admins.length > 9) {
      helper = "0" + admins.length.toString();
    } else {
      helper = admins.length.toString();
    }
    var date = new Date();
    var components = ["ADM", date.getFullYear(), departmentHelper, helper];

    var username = components.join("");
    let hashedPassword;
    const newDob = "123";

    hashedPassword = await bcrypt.hash(newDob, 10);
    var passwordUpdated = false;
    const newAdmin = await new Admin({
      name,
      email,
      password: hashedPassword,
      joiningYear,
      username,
      department,
      avatar,
      contactNumber,
      dob,
      passwordUpdated,
    });
    await newAdmin.save();
    return res.status(200).json({
      success: true,
      message: "Admin registerd successfully",
      response: newAdmin,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};
export const addDummyAdmin = async () => {
  const email = "shikha@gmail.com";
  const password = "123";
  const name = "dummy";
  const username = "SHAIKH";
  let hashedPassword;
  hashedPassword = await bcrypt.hash(password, 10);
  var passwordUpdated = true;

  const dummyAdmin = await Admin.findOne({ email });

  if (!dummyAdmin) {
    await Admin.create({
      name,
      email,
      password: hashedPassword,
      username,
      passwordUpdated,
    });
    console.log("Dummy user added.");
  } else {
    console.log("Dummy user already exists.");
  }
};

export const addDepartment = async (req, res) => {
  try {
    const errors = { departmentError: String };
    const { department } = req.body;
    const existingDepartment = await Department.findOne({ department });
    if (existingDepartment) {
      errors.departmentError = "Department already added";
      return res.status(400).json(errors);
    }
    const departments = await Department.find({});
    let add = departments.length + 1;
    let departmentCode;
    if (add < 9) {
      departmentCode = "0" + add.toString();
    } else {
      departmentCode = add.toString();
    }

    const newDepartment = await new Department({
      department,
      departmentCode,
    });

    await newDepartment.save();
    return res.status(200).json({
      success: true,
      message: "Department added successfully",
      response: newDepartment,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      dob,
      department,
      contactNumber,
      avatar,
      email,
      joiningYear,
      gender,
      designation,
    } = req.body;
    const errors = { emailError: String };
    const existingEmployee = await Employee.findOne({ email });

    console.log(dob);
    if (existingEmployee) {
      errors.emailError = "Email already exists";
      return res.status(400).json(errors);
    }
    const existingDepartment = await Department.findOne({ department });
    let departmentHelper = existingDepartment.departmentCode;

    const employees = await Employee.find({ department });
    let helper;
    if (employees.length < 10) {
      helper = "00" + employees.length.toString();
    } else if (employees.length < 100 && employees.length > 9) {
      helper = "0" + employees.length.toString();
    } else {
      helper = employees.length.toString();
    }
    var date = new Date();
    var components = ["FAC", date.getFullYear(), departmentHelper, helper];

    var username = components.join("");
    let hashedPassword;
    const newDob = "123";

    console.log("Created Password: ", newDob);

    hashedPassword = await bcrypt.hash(newDob, 10);
    var passwordUpdated = false;

    const newEmployee = await new Employee({
      name,
      email,
      password: hashedPassword,
      joiningYear,
      username,
      department,
      avatar,
      contactNumber,
      dob,
      gender,
      designation,
      passwordUpdated,
    });
    await newEmployee.save();
    return res.status(200).json({
      success: true,
      message: "Employee registerd successfully",
      response: newEmployee,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { department } = req.body;
    const errors = { noEmployeeError: String };
    const employees = await Employee.find({ department });
    if (employees.length === 0) {
      errors.noEmployeeError = "No Employee Found";
      return res.status(404).json(errors);
    }
    res.status(200).json({ result: employees });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { department } = req.body;

    const errors = { noAdminError: String };

    const admins = await Admin.find({ department });
    if (admins.length === 0) {
      errors.noAdminError = "No Subject Found";
      return res.status(404).json(errors);
    }
    res.status(200).json({ result: admins });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admins = req.body;
    const errors = { noAdminError: String };
    for (var i = 0; i < admins.length; i++) {
      var admin = admins[i];

      await Admin.findOneAndDelete({ _id: admin });
    }
    res.status(200).json({ message: "Admin Deleted" });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const employees = req.body;
    const errors = { noEmployeeError: String };
    for (var i = 0; i < employees.length; i++) {
      var employee = employees[i];

      await Employee.findOneAndDelete({ _id: employee });
    }
    res.status(200).json({ message: "Employee Deleted" });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { department } = req.body;

    await Department.findOneAndDelete({ department });

    res.status(200).json({ message: "Department Deleted" });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getAllEmployee = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.log("Backend Error", error);
  }
};
export const getAllDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    console.log("Backend Error", error);
  }
};
