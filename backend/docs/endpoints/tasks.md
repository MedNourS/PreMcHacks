# Tasks endpoint (/tasks)

**NOTICE:** All endpoints under `/tasks` require authentication. In order to access, you must use `credentials: 'include'` in your fetch requests. For example:

```javascript
fetch('/tasks/', {
  method: 'GET',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

## GET /tasks/

- Response:

  ```json
  {
    "success": "boolean",
    "tasks?": [
      {
        "id": "number",
        "title": "string",
        "description": "string",
        "created_at": "string",
        "updated_at": "string",
        "completed?": "boolean"
      }
    ],
    "error?": "string"
  }
  ```

## POST /tasks/

- Request Body:

```json
{
    "title": "string",
    "description?": "string",
    "start_time": "string",
    "end_time": "string", 
    "completed?": "boolean"
}
```

- Response:

```json
{
    "success": "boolean",
    "task?": {
      "id": "number",
      "title": "string",
      "description": "string",
      "status": "string",
      "created_at": "string",
      "updated_at": "string"
    },
    "error?": "string"
  }
```

## PATCH /tasks/

- Request Body:

```json
{
    "tasks": [
        {
            "id": "number",
            "title?": "string",
            "description?": "string",
            "start_time?": "string",
            "end_time?": "string",
            "completed?": "boolean"
        }
    ]
}
```

- Response:

```json
{
    "success": "boolean",
    "tasks?": [
        {
            "id": "number",
            "title": "string",
            "description": "string",
            "created_at": "string",
            "updated_at": "string",
            "completed": "boolean"
        }
    ],
    "error?": "string"
}
```

## PATCH /tasks/:id

- Request Body:

```json
{
    "title?": "string",
    "description?": "string",
    "start_time?": "string",
    "end_time?": "string",
    "completed?": "boolean"
}
```