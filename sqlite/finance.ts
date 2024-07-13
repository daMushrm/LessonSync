import * as SQLite from "expo-sqlite";

const openFinanceAsync = async () => {
  return await SQLite.openDatabaseAsync("./db.db");
};

const createFinanceTables = async (): Promise<void> => {
  try {
    const db = await openFinanceAsync();
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS finance (
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
    console.error("Error in createFinanceTables:", error);
  }
};

const addFinance = async (
  month: string,
  year: string,
  groupId: number,
  studentId: number,
  paid: boolean = false
): Promise<void> => {
  try {
    const db = await openFinanceAsync();
    await db.getAllAsync(
      "INSERT INTO finance (month, year, group_id, student_id, paid) VALUES (?, ?, ?, ?, ?)",
      [month, year, groupId, studentId, paid]
    );
  } catch (error) {
    console.error("Error in addfinance:", error);
  }
};

const updateFinance = async (id: number, paid: boolean): Promise<void> => {
  try {
    const db = await openFinanceAsync();
    await db.getAllAsync("UPDATE finance SET paid = ? WHERE id = ?", [
      paid,
      id,
    ]);
  } catch (error) {
    console.error("Error in updatefinance:", error);
  }
};

const getFinanceByGroupId = async (groupId: number): Promise<any[]> => {
  try {
    const db = await openFinanceAsync();
    const results = await db.getAllAsync(
      "SELECT * FROM finance WHERE group_id = ?",
      [groupId]
    );
    return results;
  } catch (error) {
    console.error("Error in getFinanceByGroupId:", error);
    return [];
  }
};

const deleteFinanceByStudentId = async (studentId: number): Promise<void> => {
  try {
    const db = await openFinanceAsync();
    await db.getAllAsync("DELETE FROM finance WHERE student_id = ?", [
      studentId,
    ]);
  } catch (error) {
    console.error("Error in deleteFinanceByStudentId:", error);
  }
};

const deleteFinanceByGroupId = async (groupId: number): Promise<void> => {
  try {
    const db = await openFinanceAsync();
    await db.getAllAsync("DELETE FROM finance WHERE group_id = ?", [groupId]);
  } catch (error) {
    console.error("Error in deleteFinanceByGroupId:", error);
  }
};

export {
  createFinanceTables,
  addFinance,
  updateFinance,
  getFinanceByGroupId,
  deleteFinanceByStudentId,
  deleteFinanceByGroupId,
};
