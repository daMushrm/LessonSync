export const AttendanceSchema = {
  name: "Attendance",
  properties: {
    id: "string",
    date: "date",
    group_name: "string",
    student_name: "string",
    attended: "bool",
  },
  primaryKey: "id",
};
