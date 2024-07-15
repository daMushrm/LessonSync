import * as SQLite from "expo-sqlite";

const openProfileAsync = async () => {
  return await SQLite.openDatabaseAsync("./db.db");
};

// Create the profile table if it doesn't exist
const createProfileTable = async (): Promise<void> => {
  try {
    const db = await openProfileAsync();
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS profile (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error("Error in createProfileTable:", error);
  }
};

// Add name to the profile table
const addName = async (name: string): Promise<void> => {
  try {
    const db = await openProfileAsync();
    await db.runAsync("INSERT INTO profile (name) VALUES (?)", [name]);
  } catch (error) {
    console.error("Error in addName:", error);
  }
};

// Update name in the profile table
const updateName = async (name: string): Promise<void> => {
  try {
    const db = await openProfileAsync();
    await db.runAsync("UPDATE profile SET name = ? WHERE id = 1", [name]);
  } catch (error) {
    console.error("Error in updateName:", error);
  }
};

const getName = async (): Promise<string | undefined> => {
  try {
    const db = await openProfileAsync();
    const allRows: { name: string }[] = await db.getAllAsync(
      "SELECT name FROM profile WHERE id = 1"
    );
    return allRows[0]?.name;
  } catch (error) {
    console.error("Error in getName:", error);
    return undefined;
  }
};

const clearProfileTable = async (): Promise<void> => {
  // for dev
  try {
    const db = await openProfileAsync();
    await db.execAsync("DELETE FROM profile");
    console.log("Profile table cleared successfully");
  } catch (error) {
    console.error("Error in clearProfileTable:", error);
  }
};

export { createProfileTable, addName, updateName, getName, clearProfileTable };
