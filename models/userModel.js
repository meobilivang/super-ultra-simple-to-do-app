const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, "Please fill your name"],
  },
  full_name:  {
    type: String,
    required: [true, "Please fill your full name"],
    trim: true,
    maxLength: 35,
    validate: [validator.isAlpha, "Please provide a valid Name"]
  },
  email: {
    type: String,
    required: [true, "Please fill your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  description: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ["M", "F", "T"]
  },
  password: {
    type: String,
    required: [true, "Please fill your password"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please fill your password confirm"],
    validate: {
      validator: function(retypePassword) {
        // "this" works only on create and save
        return retypePassword === this.password;
      },
      message: "You passwords don't match!",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],        //Roles
    default: "user",
  },
  activated: {
    type: Boolean,
    default: true,
    select: false, 
  },
},

//   //Collect created_at & updated_at 
//   { timestamps: true }
// );

// // encrypt the password using 'bcryptjs'
// // Mongoose -> Document Middleware
// userSchema.pre("save", async function(next) {
//   // check the password if it is modified
//   if (!this.isModified("password")) {
//     return next();
//   }

//   // Hashing the password
//   this.password = await bcrypt.hash(this.password, 12);

//   // Delete passwordConfirm field
//   this.passwordConfirm = undefined;
//   next();

// });

// // This is Instance Method that is gonna be available on all documents in a certain collection
// userSchema.methods.correctPassword = async function(
//   typedPassword,
//   originalPassword,
// ) {
//   return await bcrypt.compare(typedPassword, originalPassword);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
