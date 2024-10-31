const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid!!");
        }
      },
    },
    about: {
      type: String,
      default: "This is sample about text",
      minLength: 4,
      maxLength: 50,
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 15) {
          throw new Error("only 15 skills can add");
        }
      },
    },
  },
  { timestamps: true }
);

// alwasy use function declarion or function express. don't user arrow functions, it won't work.
userSchema.methods.getJWT = async function () {
  try {
    const user = this;
    const jwtToken = await jwt.sign({ _id: user._id }, "JAVASCRIPT@123", {
      expiresIn: "7d",
    });
    return jwtToken;
  } catch (e) {
    console.log("ERROR: " + e.messasge);
  }
};

userSchema.methods.validateUserPassword = async function (userInputPassword) {
  try {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
      userInputPassword,
      passwordHash
    );

    return isPasswordValid;
  } catch (e) {
    console.log("ERROR: " + e.messasge);
  }
};

module.exports = mongoose.model("User", userSchema);
