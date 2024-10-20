// const user = {
//   firstName: "sho",
//   lastName: "rani",
//   emailId: "shoba@gmail.com",
//   password: "Shoba@131780",
// };

const sanitizeUserSingupData = (req, res, next) => {
  try {
    const data = req.body;
    const { firstName, lastName, emailId, password } = data;
    const isValidatedFirstName = validateUsername(firstName);
    const isValidatedLastName = validateUsername(lastName);
    const isValidatedEmail = validateEmail(emailId);
    const isValidatedPassword = validatePassword(password);

    if (
      isValidatedFirstName &&
      isValidatedLastName &&
      isValidatedEmail &&
      isValidatedPassword
    ) {
      next();
      // console.log("success");
    }
  } catch (e) {
    res.status(400).send("Invalid data: " + e.message);
    // console.log("failur: " + e.message);
  }
};

function validateUsername(username) {
  username = username.trim(); // Remove leading and trailing spaces
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

  if (!username) {
    throw new Error("Username is required.");
  }
  if (!usernameRegex.test(username)) {
    throw new Error(
      "Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
    );
  }
  return true;
}

function validateEmail(emailId) {
  emailId = emailId.trim(); // Remove leading and trailing spaces
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format

  if (!emailId) {
    throw new Error("Email is required.");
  }
  if (!emailRegex.test(emailId)) {
    throw new Error("Please provide a valid email address.");
  }
  return true;
}

function validatePassword(password) {
  password = password.trim(); // Remove leading and trailing spaces
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!password) {
    throw new Error("Password is required.");
  }
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    );
  }
  return true;
}

module.exports = {
  sanitizeUserSingupData,
};
