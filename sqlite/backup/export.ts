import showToast from "@/components/showToast";
import * as FileSystem from "expo-file-system";

const exportDb = async () => {
  const backupUri = FileSystem.documentDirectory + "/SQLite/db.db";
  const publicLocationUri =
    FileSystem.documentDirectory + "Download/db_backup.db";

  try {
    await FileSystem.copyAsync({
      from: backupUri,
      to: publicLocationUri,
    });

    showToast("Backup successful");
  } catch (error) {
    console.error("Failed to copy backup to public location:", error);
  }
};

export default exportDb;
