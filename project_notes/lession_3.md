# Create Express server

## Overview

This class demonstrates how to create an Express server and explores key concepts related to Express.js, Node.js, and version management with `package.json` and `package-lock.json`.

## Concepts

- Create an Express server.
- Install Express.js using npm.
- Learn about package management: `node_modules`, `package.json`, and `package-lock.json`.
- Study versioning and the role of `^` (caret) and `~` (tilde) symbols in package versions.
- Set up Nodemon for automatic server restart during development.

## Steps

1. **Create Express Server**

   - Install Express.js using `npm install express`.
   - The `node_modules` folder will be created with the Express package and other packages required by Express.
   - The `package-lock.json` file will be created to manage exact versions of the installed packages.

2. **Understanding Package Management**

   - **`package.json` vs `package-lock.json`**
     - `package.json` stores metadata and dependencies, while `package-lock.json` contains the actual version of each installed package.
     - Example of a dependency in `package.json`:
       ```json
       "dependencies": {
         "express": "^14.21.1"
       }
       ```
     - The version numbers in `package.json` follow a semantic versioning format:
       - **14**: Major version (not backward compatible, changes may break the project).
       - **21**: Minor version (backward compatible, introduces new features).
       - **1**: Patch version (backward compatible bug fixes).

3. **Version Symbols in `package.json`**

   - **^ (caret)**: Allows automatic updates for minor and patch versions.
   - **~ (tilde)**: Allows automatic updates for patch versions.
   - **No symbol**: The project strictly runs on the specified version and does not auto-update.

4. **Homework**
   - Create a Git repository: Done.
   - Initialize the project with `npm init`: Done.
   - Study `node_modules`, `package.json`, and `package-lock.json`: Partially Done.
   - Install Express: Done.
   - Create the server: Done.
   - Listen to port 7777: Done.
   - Write request handlers for `/test` and `/hello`: Done.
   - Install Nodemon globally: Done.
   - Update the `scripts` inside `package.json` to use Nodemon: Done.

## Conclusion
