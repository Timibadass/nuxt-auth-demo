import { open } from "sqlite";
import sqlite3 from "sqlite3";

export const initDb = async () => {
	try {
		const db = await open({
			filename: "./server/db/database.sqlite",
			driver: sqlite3.Database,
		});

		await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )
    `);

		console.log("Database initialized successfully");
		return db;
	} catch (error) {
		console.error("Failed to initialize database:", error);
		throw error;
	}
};
