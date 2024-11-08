const Class = require("../models/Class");

// Create a new class
exports.createClass = async (req, res) => {
    try {
        const newClass = await Class.create(req.body);
        res.status(201).json(newClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate("teacher students");
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single class by ID
exports.getClassById = async (req, res) => {
    try {
        const classData = await Class.findById(req.params.id).populate("teacher students");
        if (!classData) return res.status(404).json({ message: "Class not found" });
        res.status(200).json(classData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a class by ID
exports.updateClass = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a class by ID
exports.deleteClass = async (req, res) => {
    try {
        await Class.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Class deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
