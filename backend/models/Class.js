const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    studentList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    studentFees: { type: Number },
});

module.exports = mongoose.model("Class", classSchema);
