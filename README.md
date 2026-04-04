## Get the database up and running in Docker

We are using a Postgres instance hosted in Docker for local development work. Execute the following command to initialize and start the instance.

```shell
docker compose up -d
```

# Generate Better-Auth schema

Anytime we change the Better-Auth configuration by adding or removing features, we will need to generate a new schema and manually incorporate those changes in the `src/db/schema.ts` file.

First, run the command which generates the schema required by Better-Auth:

```shell
pnpm run auth:generate
```

Next, open `src/db/new-auth-schema.ts` and compare to `src/db/schema.ts`. Migrate over any changes. Once complete, you can delete `src/db/new-auth-schema.ts`.

# Push changes to the database

```shell
pnpm run db:push
```

# Run the application locally

```shell
pnpm run dev
```
