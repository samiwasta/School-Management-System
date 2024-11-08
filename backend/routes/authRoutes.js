// backend/routes/classRoutes.js
const express = require("express");
const { teacherLogin, studentLogin, registerAdmin, loginAdmin } = require("../controllers/authController");

const router = express.Router();

router.post("/login", teacherLogin);
router.post("/login", studentLogin);
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;
