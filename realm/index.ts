// realm/index.js
import Realm from "realm";
import { GroupSchema } from "./schemas/GroupSchema";
import { StudentSchema } from "./schemas/StudentSchema";
import { AttendanceSchema } from "./schemas/AttendanceSchema";

const realm = new Realm({
  schema: [GroupSchema, StudentSchema, AttendanceSchema],
  schemaVersion: 1,
});

export default realm;
