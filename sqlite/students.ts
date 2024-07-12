import * as SQLite from "expo-sqlite";

const openStudentsAsync = async () => {
  return await SQLite.openDatabaseAsync("./db.db");
};

// Create the tables if they don't exist
const createStudentTables = async (): Promise<void> => {
  try {
    const db = await openStudentsAsync();
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        parent_phone TEXT NOT NULL,
        group_id INTEGER,
        FOREIGN KEY (group_id) REFERENCES groups(id)
      );
    `);
    console.log("Student tables created");
  } catch (error) {
    console.error("Error in createStudentTables:", error);
  }
};

// Get all students by group ID
const getStudentsByGroupId = async (group_id: number): Promise<Student[]> => {
  try {
    const db = await openStudentsAsync();
    const students = await db.getAllAsync("SELECT * FROM students WHERE group_id = ?", [group_id]);
    console.log("Students fetched:", students);
    return students as Student[];
  } catch (error) {
    console.error("Error in getStudentsByGroupId:", error);
    return [];
  }
};

// Add a new student to the database
const addStudent = async (
  name: string,
  phone: string,
  parent_phone: string,
  group_id: number
): Promise<void> => {
  try {
    const db = await openStudentsAsync();
    await db.runAsync(
      "INSERT INTO students (name, phone, parent_phone, group_id) VALUES (?, ?, ?, ?)",
      [name, phone, parent_phone, group_id]
    );
    console.log("Student added");
  } catch (error) {
    console.error("Error in addStudent:", error);
  }
};

export { createStudentTables, addStudent, getStudentsByGroupId };

export interface Student {
  id: number;
  name: string;
  phone: string;
  parent_phone: string;
  group_id: number;
}
