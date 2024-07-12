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
    const students = await db.getAllAsync(
      "SELECT * FROM students WHERE group_id = ?",
      [group_id]
    );
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

// Delete a student by ID
const deleteStudent = async (id: number): Promise<void> => {
  try {
    const db = await openStudentsAsync();
    await db.runAsync("DELETE FROM students WHERE id = ?", [id]);
    console.log("Student deleted");
  } catch (error) {
    console.error("Error in deleteStudent:", error);
  }
};

// Update a student by ID
const updateStudent = async (
  id: number,
  name: string,
  phone: string,
  parent_phone: string
): Promise<void> => {
  try {
    const db = await openStudentsAsync();
    await db.runAsync(
      "UPDATE students SET name = ?, phone = ?, parent_phone = ? WHERE id = ?",
      [name, phone, parent_phone, id]
    );
    console.log("Student updated");
  } catch (error) {
    console.error("Error in updateStudent:", error);
  }
};

export {
  createStudentTables,
  addStudent,
  getStudentsByGroupId,
  deleteStudent,
  updateStudent,
};

export interface Student {
  id: number;
  name: string;
  phone: string;
  parent_phone: string;
  group_id: number;
}
