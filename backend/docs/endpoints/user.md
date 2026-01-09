# User Endpoints (/user)

**NOTICE:** All endpoints under `/user` require authentication. In order to access, you must use `credentials: 'include'` in your fetch requests. For example:

```javascript
fetch('/user/username', {
  method: 'PATCH',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'SampleUsername'
  })
});
```

## GET /user/profile

- Response:

  ```json
  {
    "success": "boolean",
    "user?": {
        "id": "number",
        "username": "string",
        "email": "string",
        "created_at": "string", // ISO date string
        "updated_at": "string"  // ISO date string
    },                          // Present on success
    "error?": "string"          // Present on failure
  }
  ```

## PATCH /user/username

- Request Body:

  ```json
  {
    "username": "string"
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