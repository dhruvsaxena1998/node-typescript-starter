## NodeJS Typescript Starter

## Documentation

- [Libraries](https://github.com/dhruvsaxena1998/node-typescript-starter#libraries)
- [Features](https://github.com/dhruvsaxena1998/node-typescript-starter#features)
- [Pre requisite](https://github.com/dhruvsaxena1998/node-typescript-starter#pre-reqs)
- [Getting Started](https://github.com/dhruvsaxena1998/node-typescript-starter#getting-started)

## Libraries

| Categories    | Libraries                                  |
| ------------- | ------------------------------------------ |
| Server        | [`Hono.js`](https://hono.dev/)             |
| Database      | [`Drizzle ORM`](https://orm.drizzle.team/) |
| Validations   | [`ZOD`](https://zod.dev/)                  |
| Logging       | [`Pino`](https://github.com/pinojs/pino)   |
| OPEN Api Spec | [`Scalar`](https://scalar.com/)            |

## Features

- Full Typesafety with [Typescript](https://www.typescriptlang.org/)
- Opinionated Structure
  - Clear and organized directory structure.
  - Seperations of routes and handlers
- Validations
- Database Integration
- OPENAPI Spec Client Integrated
- Error Handling
- File stream Logging
- Testing
- Developer Experience
  - Hot Reloading
  - Linting and Code Formatting

All pre-configured or minimum configuration required\*

## Pre-reqs

- Environment - Node.JS
- Editor - VSCode (Recommended)
- Database - MySQL (pre-configured) via Drizzle ORM (configure as per needs)

## Getting Started

### Clone the Template

1. Click the "Use this template" button: On the top-right of the repository's page, you'll see a "Use this template" button. Click it.

2. Fill in repository details: You'll be prompted to give your new repository a name and set it as public or private. After that, click "Create repository from template."

3. Clone the new repository: Once the repository is created, clone it locally

```bash
git clone https://github.com/your-username/your-new-repo.git
```

4. Install Dependencies

```bash
# recommended (pnpm)
# npm i -g pnpm

pnpm install
```

### Configure Environment

Create .env file by replicating .env.example and fill as per needs. To properly run this project, you will need to setup following variables to your .env file.

> Server

| key         | default value | available values                            |
| ----------- | ------------- | ------------------------------------------- |
| NODE_ENV    | `dev`         | `dev` `stage` `uat` `preprod` `prod` `test` |
| SERVER_PORT | `3000`        | `number`                                    |

> Logging

| key       | default value | available values                              |
| --------- | ------------- | --------------------------------------------- |
| LOG_LEVEL | `debug`       | `fatal` `error` `warn` `info` `debug` `trace` |

> Database

| key     | default value |
| ------- | ------------- |
| DB_HOST | `localhost`   |
| DB_PORT | `3306`        |
| DB_USER |               |
| DB_PASS |               |
| DB_NAME |               |

### Starting Application

```bash
pnpm dev
```

### Building

```bash
pnpm build
```

### Other Commands

```bash
pnpm <command>
```

| command    | description                              |
| ---------- | ---------------------------------------- |
| dev        | start hot-reload server                  |
| build      | build javascript source                  |
| start      | start application from javascript source |
| lint       | linting via eslint                       |
| lint:fix   | auto-fix linting issues                  |
| fmt        | auto-format via prettier                 |
| test       | test application                         |
| type-check | typecheck application without building   |

## Authors

- [@dhruvsaxena1998](https://github.com/dhruvsaxena1998)
