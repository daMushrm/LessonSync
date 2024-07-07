import realm from "../index";
import { v4 as uuidv4 } from "uuid";

interface Group {
  id: string;
  name: string;
  time: Date;
  day: string;
  students: Student[];
}

interface Student {
  id: string;
  name: string;
  phone: string;
  parent_phone: string;
}

// Add a new group
export const addGroup = (name: string, time: Date, day: string): void => {
  realm.write(() => {
    realm.create("Group", {
      id: uuidv4(),
      name,
      time,
      day,
      students: [],
    });
  });
};

// Get all groups
export const getGroups = () => {
  return realm.objects("Group");
};

// Add a student to a group
export const addStudentToGroup = (groupId: string, studentId: string): void => {
  const group: Group | null = realm.objectForPrimaryKey("Group", groupId);
  const student: Student | null = realm.objectForPrimaryKey(
    "Student",
    studentId
  );
  if (group && student) {
    realm.write(() => {
      group.students.push(student);
    });
  }
};

// Delete a group
export const deleteGroup = (groupId: string): void => {
  const group = realm.objectForPrimaryKey<Group>("Group", groupId);
  if (group) {
    realm.write(() => {
      realm.delete(group);
    });
  }
};
