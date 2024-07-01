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
			return { success: true };
		} catch (error) {
			console.error("Error creating user:", error);
			return { error: "Username already exists" };
		}
	} catch (error) {
		console.error("Error handling signup request:", error);
		return { error: "Failed to process request" };
	}
});
