# mt-backend

A backend REST API for a task management application. 

## Table of contents

- [Overview](#overview)
- [Getting started](#getting-started)
- [REST API](#REST-API)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Development Scripts](#development-scripts)
- [To do](#to-do)
- [References](#references)

## Overview
This REST API utilizes the following stack:

- Framework - [Express.js](https://expressjs.com/)
- Language - [TypeScript](https://www.typescriptlang.org)
- Database - [PlanetScale: MySQL](https://planetscale.com)
- ORM Client - [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)
- Auth - [JSON Web Tokens](https://jwt.io/)
- Logging - [Pino](https://github.com/pinojs/pino)

## Getting started

Install npm dependencies:

```
cd mt-backend
npm install
```

Populate `.env` values:

```
DATABASE_URL="..."

# For local testing, set to any unique value
JWT_SECRET_KEY="..."
JWT_ISSUER="..."
```

Start the REST API server:

```
npm run dev
```

The server is now running on `http://localhost:8080`.

## REST API
Please refer to the endpoint's `schema.ts` for valid request payload properties.

### `/api/users`
Required: HTTP Authorization request header JWT Token
- `GET /api/users/:id` : Fetch a user by their `id`
- `PUT /api/users/:id` : Update a user by their `id`
- `DELETE /api/users/:id` : Delete user by their `id`
  
### `/api/tasks`
Required: HTTP Authorization request header JWT Token
- `GET /api/tasks` : Fetch all tasks created by authorized user
- `POST /api/tasks` : Create a new task
  - Body:
    - `title: String` (required): The title of the task
    - `description: String` (optional): The content of the task
- `GET /api/tasks/:id`
  - Fetch a task by their `id`
- `PUT /api/tasks/:id`
  - Update a task by their `id`
- `DELETE /api/tasks/:id`
  - Delete task by their `id`

### `/api/registration`
- `POST /api/registration` : Create a new user
  - Body:
    - `email: String` (required): The email of the user
    - `password: String` (required): The password of the user
### `/api/auth`
- `POST /api/auth` : Validate a user's HTTP Authorization request header JWT Token
  - Response:
    - `validToken: Boolean` : Whether the JWT Token is valid
- `POST /api/auth/login` : Authenticate a user
  - Body:
    - `email: String` (required): The email of the user
    - `password: String` (required): The password of the user

## Project Structure
The API follows a route/component-based colocation structure. `_` prefixed folders are excluded from Vercel deployment configuring them as Serverless functions. `api` is a mandatory Vercel-specific folder name restriction for Serverless functions.
```
├── api                 // Build output for Vercel deployment
├── _api                // Source
│   ├── auth            // Authentication, login
│   ├── registration
│   ├── tasks
│   ├── users
│   │   ├── handlers.ts // Controllers to unpack web layer
│   │   ├── routes.ts   // Collect API endpoints into router
│   │   ├── schema.ts   // JSON Schemas for related route
│   │   └── service.ts  // Database access layer
│   └── app.ts          // APIs for Task model
├── _middleware
├── prisma
│   ├── data.ts         // Dummy database data
│   ├── schema.prisma   // Database model
│   └── seed.ts
├── _types
├── _utils               // APIs for Task model
└── tsconfig.json
└── server.ts            // Entry
```
## Deployment
This application is currently setup to deploy to Vercel as a Serverless function. Upon running `npm run build-api`, an `api` directory is created for Vercel to recognize. However, with the project structure focused on separating concerns and the use of TypeScript path aliasing, `server.ts` is the only file configured to run as a serverless function due to Vercel's limitations.
## Development Scripts
### Vercel Deployment
#### Preview deployment with commit
```
npm run build-api
```
```
vercel
```
### Prisma
#### Sync local schema with PlanetScale database schema
```
npx prisma db push
```

#### Manually generate seed data with Prisma
`User` and `Task` tables are defined in [`prisma/schema.prisma`](./prisma/schema.prisma).
The seed file in [`prisma/seed.ts`](./prisma/seed.ts) **clears** the existing connected database and writes dummy data.
```
npx prisma db seed
```

#### Generate JSON Schema from Prisma Schema
This uses [prisma-json-schema-generator](https://github.com/valentinpalkovic/prisma-json-schema-generator) to generate a [JSON Schema v7](https://json-schema.org/) defined in [`prisma/schema.prisma`](./prisma/schema.prisma):
```
npx prisma generate
```
#### Prisma Database GUI
```
npx prisma studio
```
## To do
- [ ] Use `Bearer` standard for HTTP request header authorization
- [ ] Add user authorization check for self /users and created /tasks only
- [ ] Document return responses from API
- [ ] Standardize Error responses across all potential Error types
- [ ] Rewrite API endpoint /users/tasks to fetch task of user
- [ ] Write tests for API endpoints
- [ ] Prisma Validator
- [ ] API Versioning
- [ ] http-status-codes ReasonPhrases usage?

## References
<details><summary><strong>Notes</strong></summary>

MySQL database tables have been created and defined using Prisma. 

Models and schemas are validated through middleware and follow JSON Schema.

</details>
<details><summary><strong>Other sources</strong></summary>

## General
https://www.prisma.io/typescript
https://www.prisma.io/express

### Prisma
https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety#importing-generated-types
https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-related-record   

#### Database Seeding
https://www.prisma.io/docs/guides/migrate/seed-database#example-seed-scripts
https://dev.to/isnan__h/seeding-your-database-with-prisma-orm-935
https://planetscale.com/blog/how-to-seed-a-database-with-prisma-and-next-js#branching-in-planetscale

## Reading Material
https://blog.treblle.com/egergr/
https://blog.treblle.com/the-10-rest-commandments/
https://github.com/goldbergyoni/nodebestpractices?ref=blog.treblle.com
https://www.codemzy.com/blog/nodejs-file-folder-structure
https://www.codemzy.com/blog/nodejs-api-versioning

## Error Handling
https://expressjs.com/en/guide/error-handling.html
https://sematext.com/blog/expressjs-best-practices/#how-to-structure-express-js-applications

## Extend Express Request Object
https://blog.logrocket.com/extend-express-request-object-typescript/

## Express Middleware JSON Schema data validation
https://www.npmjs.com/package/express-json-validator-middleware
https://simonplend.com/how-to-handle-request-validation-in-your-express-api/#how-to-integrate-validation-with-json-schemas-into-your-application

## JWT
https://dev.to/knitesh/securing-your-json-web-tokens-with-jwt-schema-validation-in-javascript-29p1

## Connecting Client Front end to REST API
https://create-react-app.dev/docs/deployment#other-solutions

</details>