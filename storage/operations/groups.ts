import JsonFile, { JSONObject } from "@expo/json-file";
import * as FileSystem from "expo-file-system";

const groupFilePath = FileSystem.documentDirectory + "/data/groups.json";
const jsonFile = new JsonFile<JSONObject>(groupFilePath);

const readGroupsFile = async () => {
  try {
    await jsonFile.readAsync();
    return jsonFile;
  } catch (error) {
    console.error("Error reading groups.json:", error);
    return [];
  }
};

export const getGroups = async () => {
  return await readGroupsFile();
};
