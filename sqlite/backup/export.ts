import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const exportDb = async () => {
  try {
    await Sharing.shareAsync(FileSystem.documentDirectory + "/sqlite/db.db");
  } catch (error) {
    console.error("Backup failed", error);
  }
};

export default exportDb;
