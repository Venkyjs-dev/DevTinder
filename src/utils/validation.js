const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter Valid password");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter Strong Password");
  }
};

module.exports = {
  validateSignUpData,
};
