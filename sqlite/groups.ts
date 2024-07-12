import * as SQLite from "expo-sqlite";

const openGroupsAsync = async () => {
  return await SQLite.openDatabaseAsync("./db.db");
};

// Create the tables if they don't exist
const createGroupTables = async (): Promise<void> => {
  try {
    const db = await openGroupsAsync();
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS groups (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        day TEXT NOT NULL,
        time TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error("Error in createTables:", error);
  }
};

// Get all groups from the database
const getAllGroups = async (): Promise<Group[]> => {
  try {
    const db = await openGroupsAsync();
    const allRows = await db.getAllAsync("SELECT * FROM groups");
    return allRows as any[];
  } catch (error) {
    console.error("Error in getAllGroups:", error);
    return [];
  }
};

const getGroupById = async (id: number): Promise<Group | undefined> => {
  try {
    const db = await openGroupsAsync();
    const allRows = await db.getAllAsync("SELECT * FROM groups WHERE id = ?", [
      id,
    ]);
    return allRows[0] as any;
  } catch (error) {
    console.error("Error in getGroupById:", error);
    return undefined;
  }
};

const addGroup = async (
  name: string,
  day: string,
  time: string
): Promise<void> => {
  try {
    const db = await openGroupsAsync();
    await db.runAsync("INSERT INTO groups (name, day, time) VALUES (?, ?, ?)", [
      name,
      day,
      time,
    ]);
  } catch (error) {
    console.error("Error in addGroup:", error);
  }
};

const updateGroup = async (
  id: number,
  name: string,
  day: string,
  time: string
): Promise<void> => {
  try {
    const db = await openGroupsAsync();
    await db.runAsync(
      "UPDATE groups SET name = ?, day = ?, time = ? WHERE id = ?",
      [name, day, time, id]
    );
    console.log("Group updated");
  } catch (error) {
    console.error("Error in updateGroup:", error);
  }
};

export { createGroupTables, getAllGroups, addGroup, updateGroup, getGroupById };

export interface Group {
  id: number;
  name: string;
  day: string;
  time: string;
}
