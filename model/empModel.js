import mongoose from "mongoose";

const empSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  department: String,
  salary: Number,
});

const empModel = mongoose.model("emp", empSchema);

export { empModel };
