# Express.js Routing and Request Handling

## Overview

Routing in Express.js defines how your application responds to various client requests (GET, POST, etc.) at specific URLs (endpoints). The order in which routes are written plays a crucial role, as Express processes routes in a **top-to-bottom** manner. Once a match is found, the corresponding handler is executed, and no further routes are checked.

## Key Concepts

- **Order of Routes**: When a route matches, Express stops checking subsequent routes.
- **GET Requests via Browser**: Typing a URL in the browser triggers a `GET` request. Other request methods (like POST, PUT) cannot be initiated via the browser's address bar.
- **API Testing**: It’s better to use **Postman** rather than a browser for testing APIs.

## Using Postman for API Testing

1. **Install Postman**: Download [Postman](https://www.postman.com/downloads/) for API testing.
2. **Create Workspace/Collection**: Organize your API tests using collections.
3. **Test HTTP Methods**: Use Postman to test `GET`, `POST`, `PATCH`, `PUT`, and `DELETE` requests.

## Express.js Route Handlers

- `app.get()`: Handles `GET` requests.
- `app.post()`: Handles `POST` requests.
- `app.put()`: Handles `PUT` requests.
- `app.patch()`: Handles `PATCH` requests.
- `app.delete()`: Handles `DELETE` requests.
- `app.use()`: Can be used to handle all HTTP methods.

### Example

```js
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.post("/submit", (req, res) => {
  res.send("Data Submitted!");
});
```

## Advanced Routing Techniques

- **Special Characters in Routes**:

  - `?`: Matches zero or one occurrence of the preceding character.
  - `+`: Matches one or more occurrences of the preceding character.
  - `*`: Matches zero or more occurrences of the preceding character.
  - `()` (parentheses): Group characters.

- **Regex in Routes**: You can define routes with regular expressions for advanced matching.

  Example:

  ```js
  app.get(/.*fly$/, (req, res) => res.send('Matched route ending with "fly"'));
  ```

- **Query Parameters**: Routes can accept query parameters like `/search?q=term`, and these can be read within route handlers.

## Homework & Practice

- Play with different routes and route extensions: `/hello`, `/`, `/hello/2`, `/xyz`.
- Install Postman, create a workspace, and test API calls.
- Write and test `GET`, `POST`, `PATCH`, and `DELETE` routes.
- Explore routing with special characters (`?`, `+`, `*`, `()`).
- Practice using regular expressions in routes.
- Read query parameters in routes.
