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
        name TEXT NOT NULL,
        male BOOLEAN NOT NULL DEFAULT 1
      );
    `);
  } catch (error) {
    console.error("Error in createProfileTable:", error);
  }
};

// Add name to the profile table
const addName = async (name: string, male: boolean): Promise<void> => {
  try {
    const db = await openProfileAsync();
    await db.runAsync("INSERT INTO profile (name, male) VALUES (?, ?)", [
      name,
      male ? 1 : 0,
    ]);
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

// Update male status in the profile table
const updateMaleStatus = async (male: boolean): Promise<void> => {
  try {
    const db = await openProfileAsync();
    await db.runAsync("UPDATE profile SET male = ? WHERE id = 1", [
      male ? 1 : 0,
    ]);
  } catch (error) {
    console.error("Error in updateMaleStatus:", error);
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

const getMaleStatus = async (): Promise<boolean | undefined> => {
  try {
    const db = await openProfileAsync();
    const allRows: { male: number }[] = await db.getAllAsync(
      "SELECT male FROM profile WHERE id = 1"
    );
    const maleStatus = allRows[0]?.male;
    return maleStatus === 1 ? true : false;
  } catch (error) {
    console.error("Error in getMaleStatus:", error);
    return undefined;
  }
};

export {
  createProfileTable,
  addName,
  updateName,
  updateMaleStatus,
  getName,
  getMaleStatus,
};
