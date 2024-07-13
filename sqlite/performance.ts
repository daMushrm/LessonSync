import * as SQLite from "expo-sqlite";

const openPerformanceAsync = async () => {
  return await SQLite.openDatabaseAsync("./db.db");
};

// Create the tables if they don't exist
const createPerformanceTables = async (): Promise<void> => {
  try {
    const db = await openPerformanceAsync();
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS performance (
        id INTEGER PRIMARY KEY NOT NULL,
        date TEXT NOT NULL,
        group_id INTEGER,
        student_id INTEGER,
        score INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (group_id) REFERENCES groups(id),
        FOREIGN KEY (student_id) REFERENCES students(id)
      );
    `);
  } catch (error) {
    console.error("Error in createPerformanceTables:", error);
  }
};

// Add a new performance record to the database
const addPerformance = async (
  date: string,
  groupId: number,
  studentId: number,
  score: number = 0
): Promise<void> => {
  try {
    const db = await openPerformanceAsync();
    const results = await db.getAllAsync(
      "SELECT * FROM performance WHERE date = ? AND group_id = ? AND student_id = ?",
      [date, groupId, studentId]
    );

    if (results.length === 0) {
      await db.runAsync(
        "INSERT INTO performance (date, group_id, student_id, score) VALUES (?, ?, ?, ?)",
        [date, groupId, studentId, score]
      );
    } else {
      await db.runAsync(
        "INSERT OR REPLACE INTO performance (date, group_id, student_id, score) VALUES (?, ?, ?, ?)",
        [date, groupId, studentId, score]
      );
    }
  } catch (error) {
    console.error("Error in addPerformance:", error);
  }
};

// Update performance score
const updatePerformance = async (id: number, score: number): Promise<void> => {
  try {
    const db = await openPerformanceAsync();
    await db.runAsync("UPDATE performance SET score = ? WHERE id = ?", [
      score,
      id,
    ]);
  } catch (error) {
    console.error("Error in updatePerformance:", error);
  }
};

// Get performance records by group ID
const getPerformanceByGroupId = async (
  group_id: number
): Promise<Performance[]> => {
  try {
    const db = await openPerformanceAsync();
    const performances = await db.getAllAsync(
      "SELECT * FROM performance WHERE group_id = ?",
      [group_id]
    );
    return performances as Performance[];
  } catch (error) {
    console.error("Error in getPerformanceByGroupId:", error);
    return [];
  }
};

// Clear the performance table (temporary function for testing)
const clearPerformanceTable = async (): Promise<void> => {
  try {
    const db = await openPerformanceAsync();
    await db.runAsync("DELETE FROM performance");
  } catch (error) {
    console.error("Error in clearPerformanceTable:", error);
  }
};

// Delete performance records by student ID
const deletePerformanceByStudentId = async (
  studentId: number
): Promise<void> => {
  try {
    const db = await openPerformanceAsync();
    await db.runAsync("DELETE FROM performance WHERE student_id = ?", [
      studentId,
    ]);
  } catch (error) {
    console.error("Error in deletePerformanceByStudentId:", error);
  }
};

// Delete performance records by group ID
const deletePerformanceByGroupId = async (groupId: number): Promise<void> => {
  try {
    const db = await openPerformanceAsync();
    await db.runAsync("DELETE FROM performance WHERE group_id = ?", [groupId]);
  } catch (error) {
    console.error("Error in deletePerformanceByGroupId:", error);
  }
};

export {
  createPerformanceTables,
  addPerformance,
  updatePerformance,
  getPerformanceByGroupId,
  clearPerformanceTable,
  deletePerformanceByStudentId,
  deletePerformanceByGroupId,
};

export interface Performance {
  id: number;
  date: string;
  group_id: number;
  student_id: number;
  score: number;
}
