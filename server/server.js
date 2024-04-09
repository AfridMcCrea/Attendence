// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://ecb22010:afriddb@afriddb.0j2rrsp.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Mongoose schema for attendance records
const attendanceSchema = new mongoose.Schema({
  name: String,
  attendance: Number,
  attended: Number,
  percentage: Number,
});

// Create a Mongoose model
const Attendance = mongoose.model("Attendance", attendanceSchema);

app.use(bodyParser.json());

// API endpoint to save attendance records
app.post("/api/attendance", async (req, res) => {
  try {
    const records = req.body.records;
    const savedRecords = await Attendance.insertMany(records);
    res.json(savedRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

