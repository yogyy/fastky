# Fastify + Kysely

This project combines Fastify with Kysely for building a web application with a PostgreSQL database backend.

## Getting Started

### Prerequisites

Before starting the project, ensure you have the following installed on your machine:

- Node.js
- PostgreSQL

### Setup

#### 1. Clone the Repository

```sh
git clone <https://github.com/yogyy/fastky.git>
```

#### 2. Install Dependencies

```sh
cd fasky
npm install
```

#### 3. Create Database Table

Execute the following SQL commands to create the necessary table in your PostgreSQL database:

```sql
CREATE TABLE ky_user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role "UserType" NOT NULL DEFAULT 'user'::"UserType",
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE ky_user ADD COLUMN uuid UUID DEFAULT gen_random_uuid();

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON ky_user
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_updated_at();
```

#### 4. Create .env File

Copy the sample .env file and update it with your database connection details:

```sh
cp .env.sample .env
```

#### 5. Generate Database Types

Run the following command to generate TypeScript types for your database:

```sh
npm run db:type
```

#### 6. Run Tests

Execute the following command to run the tests:

```sh
npm run test
```

Now you're ready to start developing your Fastify + Kysely project!
