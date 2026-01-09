# PreMcHacks Backend

## Folder Structure

```
backend/
├── .env                 # Environment variables
└── src/
    ├── app.ts           # Main application
    ├── middleware.ts    # Middleware functions
    ├── server.ts        # Entry point
    ├── controllers      # Route handlers
    ├── db               # Database connection and helper functions
    ├── routers          # API route definitions
    ├── schemas          # Zod data validation schemas
    └── types            # Additional TS type definitions
```

## Setup
1. Install [Bun](https://bun.sh/).
2. Navigate to the `backend/` directory.
3. Run `bun install` to install dependencies.
4. Create a `.env` file in the `backend/` directory and add necessary environment variables. An example is provided in `.env.example`.
5. Run `bun run server` to start the server.

## How it works

1. A request is made to the server on a specific route (e.g., `auth/login`).
2. Depending on the route, middleware functions are executed (like authentication checks using JWT).
3. The request is forwarded to the appropriate route handler (in `routers/`).
4. The route handler validates the request data using Zod schemas (in `schemas/`). It returns an error if validation fails.
5. If validation passes, the route handler calls the corresponding controller function (in `controllers/`).
6. The controller interacts with the database (using functions in `db/`) to perform the required operations (like fetching or storing data).
7. The controller sends a response back to the client with the result of the operation.