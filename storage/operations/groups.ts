import RNFS from "react-native-fs";

const groupFilePath = RNFS.DocumentDirectoryPath + "/data/groups.json";

// Function to read the groups.json file
const readGroupsFile = async () => {
  try {
    const data = await RNFS.readFile(groupFilePath, "utf8");
    return JSON.parse(data).groups;
  } catch (error) {
    console.error("Error reading groups.json:", error);
    return [];
  }
};

// Function to write to the groups.json file
const writeGroupsFile = async (groups: any[]) => {
  try {
    const data = JSON.stringify({ groups }, null, 2);
    await RNFS.writeFile(groupFilePath, data, "utf8");
  } catch (error) {
    console.error("Error writing to groups.json:", error);
  }
};

// Fetch all groups
export const getGroups = async () => {
  return await readGroupsFile();
};

// Add a new group
export const addGroup = async (newGroup: any) => {
  const groups = await readGroupsFile();
  groups.push(newGroup);
  await writeGroupsFile(groups);
};

// Update a group
export const updateGroup = async (updatedGroup: any) => {
  let groups = await readGroupsFile();
  groups = groups.map((group: any) =>
    group.id === updatedGroup.id ? updatedGroup : group
  );
  await writeGroupsFile(groups);
};

// Delete a group
export const deleteGroup = async (groupId: string) => {
  let groups = await readGroupsFile();
  groups = groups.filter((group: any) => group.id !== groupId);
  await writeGroupsFile(groups);
};
