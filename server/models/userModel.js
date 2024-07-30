import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name can't exceed 30 character"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Minimum password length should be 5 character"],
  },
});
//hashed password using bcrypt
personSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//get jwt Token
personSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// compare password
personSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Person = mongoose.model("User", personSchema);

export default Person;
