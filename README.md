# Technologies

[Tanstack Start](https://tanstack.com/start/latest)

Tanstack Start provides full-document SSR, Streaming, Server Functions, bundling and more, powered by TanStack Router and Vite.

[Tanstack Router](https://tanstack.com/router/latest)

A powerful React router for client-side and full-stack react applications. Fully type-safe APIs, first-class search-params for managing state in the URL and seamless integration with the existing React ecosystem.

[Better-Auth](https://better-auth.com/)

Better-Auth provides APIS and hooks for us to code all the functiions necessary for us to implememnt authentication and some authorization.

[Drizzle ORM](https://orm.drizzle.team/)

Drizzle is the ORM (Object Relational Mapper) that allows our application to communicate with the database.

[date-fns](https://date-fns.org/v4.1.0/docs/format)
Date processing and formatting.

# FAQ

### Install dependencies

Once you have cloned the source from GitHub, install the dependencies.

```shell
pnpm i
```

### Get the database up and running in Docker if you want to run locally

We are using a Postgres instance hosted in Docker for local development work. Execute the following command to initialize and start the instance.

```shell
docker compose up -d
```

### Generate Better-Auth schema

Anytime we change the Better-Auth configuration by adding or removing features, we will need to generate a new schema and manually incorporate those changes in the `src/db/schema.ts` file.

First, run the command which generates the schema required by Better-Auth:

```shell
pnpm run auth:generate
```

Next, open `src/db/new-auth-schema.ts` and compare to `src/db/schema.ts`. Migrate over any changes. Once complete, you can delete `src/db/new-auth-schema.ts`.

### Push changes to the database

```shell
pnpm run db:push
```

### Flush/fill database with seed data

```shell
pnpm run db:seed
```

### Run the application locally

```shell
pnpm run dev
```

### Run Drizzle Studio

Drizzle Studio is a useful UI for interacting with the database configured for use by Drizzle ORM.

```shell
pnpm run db:studio
```

### Apply a shadcn preset to apply colors and other styles.

```shell
pnpm dlx shadcn@latest apply --preset b6WK0xowQq
```

Themes
https://tweakcn.com/themes/cmlnfhvh2000004l7ggzsans1

https://tweakcn.com/themes/cmmadj6zx000204l23giib1s2
https://tweakcn.com/themes/cmmz25mmt000204l08j7sbxg6
