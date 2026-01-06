# Auth Endpoints (/auth)

**NOTICE:** This endpoint does not require authentication at all.

## POST /auth/signup

- Request Schema:

  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- Response:

  ```json
  {
    "success": "boolean",
    "message?": "string", // Present on success
    "error?": "string"    // Present on failure
  }
  ```

## POST /auth/login

- Request Schema:

  ```json
  {
    "identifier": "string", // Can be either username or email
    "password": "string"
  }
  ```

- Response:

  ```json
  {
    "success": "boolean",
    "message?": "string", // Present on success
    "error?": "string"    // Present on failure
  }
  ```
  **NOTE:** On successful login, a cookie named `auth` will be given to the browser.

## POST /auth/logout

- Response:

  ```json
  {
    "success": "boolean"
  }
  ```