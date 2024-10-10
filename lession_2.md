# Dev Tinder Project Plaing

## Overview

This project focuses on building a social connection platform, "Dev Tinder," where users can create accounts, update profiles, explore other users, send connection requests, and manage their connections.

## Features

1. **Account Management**
   - Create account
   - Login
   - Update profile
2. **Connection Management**
   - Explore feed page (user discovery)
   - Send connection requests
   - View matches
   - See sent, rejected, and ignored requests
3. **User Profiles**
   - Update profile details like first name, last name, email, password, age, and gender.

## Development Phases

### Requirements Gathering

The engineering team will gather requirements for the following features:

- Account creation, login, and profile updates.
- Connection requests and user matches.
- Viewing, sending, and rejecting connection requests.

### High-Level Design (HDL) & Low-Level Design (LLD)

The team will create HDL and LLD for:

- Structuring the frontend and backend services.
- Designing the database and API architecture.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, MongoDB

### Microservices Architecture

- **Frontend Service**: Focused on user interface.
- **Backend Service**: Responsible for API and database interactions.

## Backend Planning

### Database Design (MongoDB)

1. **User Collection**: Stores user information:
   - First name
   - Last name
   - Email
   - Password
   - Age
   - Gender
2. **ConnectionRequests Collection**: Stores connection requests:
   - fromUserId
   - toUserId
   - Status (pending | accepted | rejected | ignored)

### API Design (RESTful)

The APIs will be based on REST principles. Here's a brief overview of the required endpoints:

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| POST   | `/signup`        | Create a new user account    |
| POST   | `/login`         | Login to the platform        |
| GET    | `/profile`       | Fetch user profile           |
| POST   | `/profile`       | Update profile information   |
| PATCH  | `/profile`       | Modify specific profile data |
| DELETE | `/profile`       | Delete user profile          |
| POST   | `/sendRequest`   | Send a connection request    |
| POST   | `/reviewRequest` | Review a received request    |
| GET    | `/requests`      | Get all connection requests  |
| GET    | `/connections`   | View matched connections     |

## API Reference

The following HTTP methods will be used in the application:

- **GET**: Retrieve data from the server.
- **POST**: Send data to create new records.
- **PUT**: Update existing records.
- **PATCH**: Partially update existing records.
- **DELETE**: Remove records from the database.

## Conclusion

This project emphasizes proper backend planning, with a strong focus on database and API design. Thoughtful planning in this phase will streamline development, making the coding process more efficient and reliable.
