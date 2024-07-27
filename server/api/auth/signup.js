// server/api/auth/signup.js
import bcrypt from "bcrypt";
import { initDb } from "../../db/database";

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event); // Retrieve request body
		if (!body) {
			return { error: "Request body is empty or undefined" };
		}

		const { username, password } = body;

		if (!username || !password) {
			return { error: "Username and password are required" };
		}

		const db = await initDb(); // Initialize database connection
		const hashedPassword = await bcrypt.hash(password, 10); // Hash password

		try {
			// Insert user data into database
			await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
				username,
				hashedPassword,
			]);
			const user = await db.get(
				"SELECT id, username FROM users WHERE username = ?",
				[username]
			);
			const userData = { username: user.username };
			await setUserSession(event, {
				user: userData,
				loggedInAt: new Date(),
			});

			return { success: true, user };
		} catch (error) {
			console.error("Error creating user:", error);
			return createError({
				statusCode: 409,
				statusMessage: "Username already exists",
			});
		}
	} catch (error) {
		console.error("Error handling signup request:", error);
		return createError({
			statusCode: 400,
			statusMessage: "Failed to process request",
		});
	}
});
