// realm/operations/studentOperations.js
import realm from "../index";
import { v4 as uuidv4 } from "uuid";

// Add a new student
export const addStudent = (
  name: string,
  phone: string,
  parent_phone: string
) => {
  realm.write(() => {
    realm.create("Student", { id: uuidv4(), name, phone, parent_phone });
  });
};

// Get all students
export const getStudents = () => {
  return realm.objects("Student");
};

// Delete a student
export const deleteStudent = (studentId: string) => {
  const student = realm.objectForPrimaryKey("Student", studentId);
  if (student) {
    realm.write(() => {
      realm.delete(student);
    });
  }
};
