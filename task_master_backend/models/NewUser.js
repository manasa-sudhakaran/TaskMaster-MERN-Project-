const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Task Schema
const TaskSchema = new Schema({
  taskName: String,
  status: String,
  dueDate: Date,
  taskType: String,
  hoursBudgeted: Number,
  actualHoursTaken: Number
});

// Project Schema
const ProjectSchema = new Schema({
  projectName: String,
  clientName: String,
  projectDescription: String,
  estimationTime: Number,
  actualTime: Number,
  toolsUsed: [String],
  additionalInformation: String
});

// User Schema
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  designation: String,
  description: String,
  projects: [ProjectSchema], 
  tasks: [TaskSchema] 
});

const NewUserDet = mongoose.model('User', UserSchema);

module.exports = NewUserDet
