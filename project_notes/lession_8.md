# Data Validation and Sanitization in Node.js

Data validation and sanitization are critical steps in ensuring the integrity of data being inserted into a database. This process is especially important for POST, PATCH, and PUT APIs that add or update data.

## Mongoose Schema Validations

When building a schema using Mongoose, you can add various validations to fields using specific keys. These are some important validation keys that can be applied to a schema:

- **required**: Ensures the field must have a value.

  - Example: `{ required: true }` means the field must be provided when creating or updating a document.

- **unique**: Ensures the field's value is unique across the collection.

  - Example: `{ unique: true }` for the email field ensures no two users can have the same email.

- **default**: Sets a default value for the field if no value is provided.

  - Example: `{ default: true }` for `isActive` ensures that by default, new users are active unless specified otherwise.

- **lowercase**: Converts the string to lowercase before storing.

  - Example: `{ lowercase: true }` for `email` ensures all email addresses are saved in lowercase.

- **trim**: Removes whitespace from the beginning and end of the string.

  - Example: `{ trim: true }` for `name` removes any extra spaces users may accidentally input.

- **minLength**: Ensures the string has at least a specified number of characters.

  - Example: `{ minLength: 3 }` for `name` ensures the name has at least 3 characters.

- **maxLength**: Ensures the string does not exceed a specified number of characters.

  - Example: `{ maxLength: 50 }` for `name` ensures the name doesn't exceed 50 characters.

- **min**: Ensures the number is greater than or equal to the specified value.

  - Example: `{ min: 18 }` for `age` ensures the user’s age is at least 18.

- **max**: Ensures the number is less than or equal to the specified value.

  - Example: `{ max: 65 }` for `age` ensures the user’s age doesn’t exceed 65.

- **validate**: Allows custom validation logic. You can write a custom validate function for any field.

### Validations on Strings

- **lowercase**, **uppercase**, **trim**: Standard string manipulations.
- **match**: Uses a regular expression to validate the string.
- **enum**: Ensures the value is within a given array.
- **minLength**, **maxLength**: Sets character length limits.

### Validations on Numbers

- **min**, **max**: Set minimum and maximum values.
- **enum**: Ensures the number is one of the values from a given array.

## Timestamps in Mongoose

Adding timestamps to a schema is crucial to keep track of when a document was created or updated. Use the `{ timestamps: true }` option in the schema, which will automatically add `createdAt` and `updatedAt` fields.

## Homework Tasks

1. Explore schema type options from the Mongoose documentation.
2. Add the following validations to your schema:
   - `required`, `unique`, `lowercase`, `min`, `minLength`, `trim`, and `default`.
3. Create a custom validation function for the `gender` field.
4. Improve the database schema by applying all appropriate validations.
5. Add timestamps to the user schema.
6. Add API-level validations for PATCH and signup APIs.
7. Install the `validator` library and use its functions to validate data at both the schema level and API level.
8. Explore the `validator` documentation.
9. Never trust `req.body` directly, always validate and sanitize the input.
