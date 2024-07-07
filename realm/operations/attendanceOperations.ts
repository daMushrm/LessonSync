// realm/operations/attendanceOperations.js
import realm from "../index";
import { v4 as uuidv4 } from "uuid";

// Add a new attendance record
export const addAttendance = (
  date: Date,
  group_name: string,
  student_name: string,
  attended: boolean
) => {
  realm.write(() => {
    realm.create("Attendance", {
      id: uuidv4(),
      date,
      group_name,
      student_name,
      attended,
    });
  });
};

// Get all attendance records
export const getAttendanceRecords = () => {
  return realm.objects("Attendance");
};

// Get attendance records for a specific date
export const getAttendanceByDate = (date: Date) => {
  return realm.objects("Attendance").filtered("date == $0", date);
};

// Delete an attendance record
export const deleteAttendance = (attendanceId: string) => {
  const attendance = realm.objectForPrimaryKey("Attendance", attendanceId);
  if (attendance) {
    realm.write(() => {
      realm.delete(attendance);
    });
  }
};
