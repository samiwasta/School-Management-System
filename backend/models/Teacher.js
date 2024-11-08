const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    contactDetails: { type: String },
    salary: { type: Number },
    assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    password: { type: String, required: true },
});

// Hash password before saving
teacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("Teacher", teacherSchema);
