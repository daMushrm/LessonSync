export const GroupSchema = {
  name: "Group",
  properties: {
    id: "string",
    name: "string",
    time: "date",
    day: "string",
    students: "Student[]",
  },
  primaryKey: "id",
};
