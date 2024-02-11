# Custom Authentication using JavaScript and PostgreSQL

## Steps to clone

- Run `npx create-next-app . --ts --tailwind --app --src-dir` to create a new Next.js project with all the necessary dependencies
- Run `npm install pg zod`
- Install [PostgreSQL and CLI](https://www.postgresql.org/download/)
- Run `createdb custom-auth` to create a Postgres database
- Run `psql custom-auth` and then run this SQL command to create the users table:

```sql
-- This creates the users table

CREATE TABLE users (
  id SERIAL PRIMARY KEY, -- SERIAL is like AUTO_INCREMENT
  uid TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);
```

- On the same `psql` instance, run this SQL command to create the sessions table:

```sql
-- This creates the sessions table

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY, -- SERIAL is like AUTO_INCREMENT
  token TEXT NOT NULL UNIQUE,
  uid TEXT NOT NULL UNIQUE,
  CONSTRAINT fk_uid
    FOREIGN KEY(uid)
      REFERENCES users(uid)
      ON DELETE CASCADE
);
```

## Notes

- If you mess up at any point you can run this command and start again: `dropdb custom-auth`
