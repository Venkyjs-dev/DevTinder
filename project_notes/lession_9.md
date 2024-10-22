# Password Encryption and Login API Best Practices

## Password Encryption

1. **Never trust user input:** Always validate the `req.body` for POST, PUT, or PATCH requests before processing or storing data.
2. **Validate API request body:** Use proper validation techniques to ensure the incoming data adheres to the expected format and constraints. For instance, validate fields like `email`, `password`, etc., using libraries like `validator` or custom utility/helper functions.

3. **Password Encryption:**

   - **Encrypt passwords** before storing them in the database. Never store plain text passwords.
   - Use the **bcrypt** package to hash and compare passwords. Bcrypt automatically handles the salting of passwords, which adds an extra layer of security.

4. **Don’t store plain passwords in the database:** Even in development environments, passwords should always be encrypted.

### Bcrypt Usage

- Use `bcrypt.hash()` to encrypt passwords.
- Use `bcrypt.compare()` to compare encrypted passwords during user login.

## Login API Example

```javascript
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid credentials");
    }

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    } else {
      res.send("Login successful!!!");
    }
  } catch (e) {
    res.status(400).send("Error: " + e.message);
  }
});
```

## Homework (Status: Completed)

- [x] Validate data in signup API
- [x] Install `bcrypt` package
- [x] Create password hash using `bcrypt.hash()`
- [x] Save user with encrypted password hash
- [x] Create login API
- [x] Compare passwords and throw errors if not matched

---

## Additional Points on Password Encryption and Industry Requirements

### 1. **Password Complexity**

- Ensure users create strong passwords by enforcing a minimum length (typically 8-12 characters) and requiring a mix of uppercase, lowercase, digits, and special characters.

### 2. **Salting and Hashing**

- Salting ensures that even if two users have the same password, their hashes will be different. Bcrypt automatically generates a salt and applies it during the hash creation process.
- It's recommended to use bcrypt with a salt rounds setting between 10-12 for optimal performance and security balance.

### 3. **Avoid Weak Hashing Algorithms**

- Avoid using weak hashing algorithms like MD5 or SHA1. Bcrypt is designed specifically for password hashing and is more secure against brute-force attacks.

### 4. **Password Encryption Best Practices**

- Store only hashed passwords, never the original password.
- Use HTTPS for secure data transmission, especially when dealing with sensitive data like passwords.
- Implement rate limiting and account lockout mechanisms after multiple failed login attempts to prevent brute-force attacks.

### 5. **Two-Factor Authentication (2FA)**

- Consider adding multi-factor authentication (MFA) for an extra layer of security, especially for high-privilege accounts.
