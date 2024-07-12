import * as SQLite from "expo-sqlite";

const openAttendanceAsync = async () => {
  return await SQLite.openDatabaseAsync("./db.db");
};

// Create the tables if they don't exist
const createAttendanceTables = async (): Promise<void> => {
  try {
    const db = await openAttendanceAsync();
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY NOT NULL,
        date TEXT NOT NULL,
        group_id INTEGER,
        student_id INTEGER,
        attended BOOLEAN NOT NULL,
        FOREIGN KEY (group_id) REFERENCES groups(id),
        FOREIGN KEY (student_id) REFERENCES students(id)
      );
    `);
  } catch (error) {
    console.error("Error in createAttendanceTables:", error);
  }
};

// Add a new attendance record to the database
const addAttendance = async (
  date: string,
  groupId: number,
  studentId: number,
  attended: boolean = false
): Promise<void> => {
  try {
    const db = await openAttendanceAsync();
    const results = await db.getAllAsync(
      "SELECT * FROM attendance WHERE date = ? AND group_id = ? AND student_id = ?",
      [date, groupId, studentId]
    );

    if (results.length === 0) {
      await db.runAsync(
        "INSERT INTO attendance (date, group_id, student_id, attended) VALUES (?, ?, ?, ?)",
        [date, groupId, studentId, attended ? 1 : 0]
      );
    } else {
      await db.runAsync(
        "INSERT OR REPLACE INTO attendance (date, group_id, student_id, attended) VALUES (?, ?, ?, ?)",
        [attended ? 1 : 0, date, groupId, studentId]
      );
    }
  } catch (error) {
    console.error("Error in addAttendance:", error);
  }
};

// Update attendance status
const updateAttendance = async (
  id: number,
  attended: boolean
): Promise<void> => {
  try {
    const db = await openAttendanceAsync();
    await db.runAsync("UPDATE attendance SET attended = ? WHERE id = ?", [
      attended ? 1 : 0,
      id,
    ]);
  } catch (error) {
    console.error("Error in updateAttendance:", error);
  }
};

// Get attendance records by group ID
const getAttendanceByGroupId = async (
  group_id: number
): Promise<Attendance[]> => {
  try {
    const db = await openAttendanceAsync();
    const attendances = await db.getAllAsync(
      "SELECT * FROM attendance WHERE group_id = ?",
      [group_id]
    );
    return attendances as Attendance[];
  } catch (error) {
    console.error("Error in getAttendanceByGroupId:", error);
    return [];
  }
};

// Clear the attendance table (temporary function for testing)
const clearAttendanceTable = async (): Promise<void> => {
  try {
    const db = await openAttendanceAsync();
    await db.runAsync("DELETE FROM attendance");
  } catch (error) {
    console.error("Error in clearAttendanceTable:", error);
  }
};

// Delete attendance records by student ID
const deleteAttendanceByStudentId = async (
  studentId: number
): Promise<void> => {
  try {
    const db = await openAttendanceAsync();
    await db.runAsync("DELETE FROM attendance WHERE student_id = ?", [
      studentId,
    ]);
  } catch (error) {
    console.error("Error in deleteAttendanceByStudentId:", error);
  }
};

export {
  createAttendanceTables,
  addAttendance,
  updateAttendance,
  getAttendanceByGroupId,
  clearAttendanceTable,
  deleteAttendanceByStudentId,
};

export interface Attendance {
  id: number;
  date: string;
  group_id: number;
  student_id: number;
  attended: boolean;
}
