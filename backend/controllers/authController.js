const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

// Teacher login
exports.teacherLogin = async (req, res) => {
    const { contactDetails, password } = req.body;
    try {
        const teacher = await Teacher.findOne({ contactDetails });
        if (teacher && (await bcrypt.compare(password, teacher.password))) {
            const token = jwt.sign({ id: teacher._id, role: "teacher" }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.json({ token });
        }
        res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Student login
exports.studentLogin = async (req, res) => {
    const { contactDetails, password } = req.body;
    try {
        const student = await Student.findOne({ contactDetails });
        if (student && (await bcrypt.compare(password, student.password))) {
            const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "1h" });
            return res.json({ token });
        }
        res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin registration
exports.registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.create({ username, password });
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Admin login
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
