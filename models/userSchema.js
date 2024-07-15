// import mongoose from 'mongoose'
// import validator from 'validator'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Please provide your name!"],
//         minLength: [3, "Name must contain atleast 3 characters"],
//         maxLength: [30, "Name cannot excced 30 charactors"],
//     },

//     email: {
//         type: String,
//         required: [true, "Please enter your Email!"],
//         validate: [validator.isEmail, "Please provide a valid Email!"],
//     },
//     phone: {
//         type: Number,
//         requried: [true, "Please Provide your number"]
//     },
//     password: {
//         type: String,
//         required: [true, "Please provide your password"],
//         minLength: [8, "password must contain atleast 8 characters"],
//         maxLength: [32, "password cannot excced 32 charactors"],
//         select: false
//     },
//     role: {
//         type: String,
//         required: [true, "Please Provide your role"],
//         enum: ["Job seeker", "Employer"]   //only these two fields are acceptable. other values cannot be entered
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// //Hashing the password
// userSchema.pre("save", async function (next) {     // Pre is executed before performing the save operation
//     if (!this.isModified("password")) {
//         next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);
// });

// // Comparing Password 
// userSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// //Creating Jwt tokens 
// userSchema.methods.getJwtToken = function () {
//     return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//         expiresIn: process.env.JWT_EXPIRE
//     });
// };


// export const User = mongoose.model("User", userSchema);



//second

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"],
    minLength: [3, "Name must contain at least 3 Characters!"],
    maxLength: [30, "Name cannot exceed 30 Characters!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a Password!"],
    minLength: [8, "Password must contain at least 8 characters!"],
    maxLength: [32, "Password cannot exceed 32 characters!"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please select a role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);

