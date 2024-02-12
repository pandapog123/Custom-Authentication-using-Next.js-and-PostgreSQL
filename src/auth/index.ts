import { Client } from "pg";
import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function createUser(formData: FormData) {
  const data = createUserSchema.parse(Object.fromEntries(formData));

  const client = new Client({
    database: "custom-auth",
  });

  await client.connect();

  try {
    // Create user record
    await client.query(
      "INSERT INTO users (uid, name, email, password) VALUES ($1::text, $2::text, $3::text, $4::text);",
      [crypto.randomUUID(), data.name, data.email, data.password]
    );

    await client.end();
  } catch (error) {
    await client.end();

    throw error;
  }

  let sessionFormData = new FormData();

  sessionFormData.append("email", data.email);
  sessionFormData.append("password", data.password);

  return createSession(sessionFormData);
}

const createSessionSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function createSession(formData: FormData) {
  const data = createSessionSchema.parse(Object.fromEntries(formData));

  const token = crypto.randomUUID();

  const client = new Client({
    database: "custom-auth",
  });

  await client.connect();

  try {
    // Get uid
    const userResult = await client.query(
      "SELECT uid FROM users WHERE email = $1::text AND password = $2::text;",
      [data.email, data.password]
    );

    const userRow = userResult.rows[0];

    if (!userRow) {
      throw new Error("User not found");
    }

    const userID = userRow.uid;

    if (!userID || typeof userID !== "string") {
      throw new Error("Invalid user record");
    }

    // Check if a user has session already
    const sessionWithSameUID = await client.query(
      "SELECT * FROM sessions WHERE uid = $1::text;",
      [userID]
    );

    if (sessionWithSameUID.rowCount === 1) {
      await client.query("DELETE FROM sessions WHERE uid = $1::text;", [
        userID,
      ]);
    }

    // Create session
    await client.query(
      `INSERT INTO sessions (token, uid) VALUES ($1::text, $2::text);`,
      [token, userID]
    );

    await client.end();
  } catch (error) {
    await client.end();

    throw error;
  }

  return token;
}

// We don't want to expose the password
const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function getUser(token: string) {
  const client = new Client({
    database: "custom-auth",
  });

  await client.connect();

  let userData: any;

  try {
    // Get session data
    const sessionResult = await client.query(
      "SELECT uid FROM sessions WHERE token = $1::text;",
      [token]
    );

    const sessionRow = sessionResult.rows[0];

    if (!sessionRow) {
      throw new Error("Session not found");
    }

    const userID = sessionRow.uid;

    if (!userID || typeof userID !== "string") {
      throw new Error("Invalid session record");
    }

    // Get user data from uid
    const userResult = await client.query(
      "SELECT name, email FROM users WHERE uid = $1::text;",
      [userID]
    );

    userData = userResult.rows[0];

    await client.end();
  } catch (error) {
    await client.end();

    throw error;
  }

  if (!userData) {
    throw new Error("User not found");
  }

  return userSchema.parse(userData);
}
