import * as SQLite from "expo-sqlite";

const openPaymentAsync = async () => {
  return await SQLite.openDatabaseAsync("./db.db");
};

const createPaymentTables = async (): Promise<void> => {
  try {
    const db = await openPaymentAsync();
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS payment (
        id INTEGER PRIMARY KEY NOT NULL,
        month TEXT NOT NULL,
        year TEXT NOT NULL,
        group_id INTEGER,
        student_id INTEGER,
        paid BOOLEAN NOT NULL,
        FOREIGN KEY (group_id) REFERENCES groups(id),
        FOREIGN KEY (student_id) REFERENCES students(id)
      );
    `);
  } catch (error) {
    console.error("Error in createPaymentTables:", error);
  }
};

const addPayment = async (
  month: string,
  year: string,
  groupId: number,
  studentId: number,
  paid: boolean = false
): Promise<void> => {
  try {
    const db = await openPaymentAsync();
    await db.getAllAsync(
      "INSERT INTO payment (month, year, group_id, student_id, paid) VALUES (?, ?, ?, ?, ?)",
      [month, year, groupId, studentId, paid]
    );
  } catch (error) {
    console.error("Error in addPayment:", error);
  }
};

const updatePayment = async (id: number, paid: boolean): Promise<void> => {
  try {
    const db = await openPaymentAsync();
    await db.getAllAsync("UPDATE payment SET paid = ? WHERE id = ?", [
      paid,
      id,
    ]);
  } catch (error) {
    console.error("Error in updatePayment:", error);
  }
};

const getPaymentByGroupId = async (groupId: number): Promise<any[]> => {
  try {
    const db = await openPaymentAsync();
    const results = await db.getAllAsync(
      "SELECT * FROM payment WHERE group_id = ?",
      [groupId]
    );
    return results;
  } catch (error) {
    console.error("Error in getPaymentByGroupId:", error);
    return [];
  }
};

const deletePaymentByStudentId = async (studentId: number): Promise<void> => {
  try {
    const db = await openPaymentAsync();
    await db.getAllAsync("DELETE FROM payment WHERE student_id = ?", [
      studentId,
    ]);
  } catch (error) {
    console.error("Error in deletePaymentByStudentId:", error);
  }
};

export {
  createPaymentTables,
  addPayment,
  updatePayment,
  getPaymentByGroupId,
  deletePaymentByStudentId,
};
