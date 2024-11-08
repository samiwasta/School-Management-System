const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    contactDetails: { type: String },
    class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    feesPaid: { type: Boolean, default: false },
    password: { type: String, required: true },
});

// Hash password before saving
studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("Student", studentSchema);
