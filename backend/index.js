const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const classRoutes = require("./routes/classRoutes");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

dotenv.config();

connectDB();

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use("/api/classes", classRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});