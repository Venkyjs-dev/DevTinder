# Authentication and JWT

## How Authentication Works

1. The user sends a login request to the server.
2. The server creates a JWT token, places the token in a cookie, and sends it back to the client.
3. The client stores the cookie.
4. For subsequent requests, the client sends the cookie to the server along with the request.
5. The server checks the validity of the token inside the cookie for every request. If valid, it sends a response; if not, it denies access.
6. write a auth middle ware and use that middle ware in the apis, which are needs to authencated.
7. try to keep the token validationa and user finding login in auth middlewares and keep the request handles will be clean and clear.

## Basic Steps for Authentication:

1. **Step 1**: Install the `cookie-parser` package.
   ```javascript
       npm install cookie-parser
   ```
2. **Step 2**: Install the `jsonwebtoken` package.
   ```javascript
      npm install jsonwebtoken
   ```
3. **Step 3**: Add the `cookieParser` middleware to all requests.

   ```javascript
   const cookieParser = require("cookie-parser");

   app.use(cookieParser());
   ```

4. **Step 4**: Create a JWT token by passing the user's ID information and a secret key.

   ```javascript
   const jwt = require("jsonwebtoken");

   // created jwt token inside /login API
   const _id = user._id;

   //create jwt token, by passing id info and secreat key
   const jwtToken = jwt.sign({ _id: _id }, "JAVASCRIPT@123");
   ```

5. **Step 5**: Place the token in a cookie and send it to the client.

   ```javascript
   // sending jwt token from /login API

   // put the token in cookie and send to client
   res.cookie("token", jwtToken);
   ```

6. **Step 6**: Receive the cookie from the client when the client makes an API request.

   ```javascript
   // From authencation required requests from client - Ex: GET /profile

   // receive the cookie from client, when client hit the API
   const { token } = req.cookies;
   ```

7. **Step 7**: Verify the received token using `jwt.verify` to check if it is correct.

   ```javascript
   // From authencation required requests from client - Ex: GET /profile

   // verify the received token, is it correct or not using jwt.verify method
   const decoded = jwt.verify(token, "JAVASCRIPT@123");
   ```

8. **Step 8**: Extract the ID from the decoded token, write a query, and send the requested data to the client.

```javascript
// From authencation required requests from client - Ex: GET /profile

// take the info: id from the decoded, then write a query and send the response data to client;
const id = decoded._id;
const user = await User.findById(id);
```

## Important Topics to Study:

- **JWT Token**: Refer to the official website for detailed information.
- **Authentication and Its Types**: Research the various types of authentication mechanisms.
- **Cookies**: Understand what cookies are, the type of information they store, and their usage.

## Homework:

- Install `cookie-parser` → Done.
- Send a dummy token to the user and check if the cookie is received on the client-side → Done.
- Create a `GET /profile` API and check if the cookie is sent back → Done.
- Install `jsonwebtoken` → In Progress.
- In the login API, after validating the email and password, create a JWT token and send it to the user in a cookie.
- Read the cookie in the `GET /profile` API and find the logged-in user.
- Implement user auth middleware. → done
- Add user auth middleware in profile API and new connection request API. → done
- Set the expiry of jwt token to 7 days.
- Set the expiry of cookies to 7 days

## Questions:

### What is JWT Token?

A JWT (JSON Web Token) is a compact, URL-safe token that represents claims between two parties. It is used for securely transmitting information.

Basically token expiries depends the application, standard time 7days.

### What are Cookies?

Cookies are small pieces of data stored on the client-side, which the server can send to identify and track users across requests.

### how to expires a cookie

we can expires the cookies by passing the expires object to the cookies

```javascript
// this cookie will be expires in 1 day.
res.cookie("token", jwtToken, { expires: "1d" });
```

### how to expires a JWT

we can expires the cookies by passing the expires object to the cookies

```javascript
// this jwt token will be expires in 7 day.
const jwtToken = jwt.sign({ _id: _id }, "JAVASCRIPT@123", {
  expiresIn: "7d",
});
```
