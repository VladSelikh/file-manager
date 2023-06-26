import { readdir, stat } from "node:fs/promises";
import { resolve } from "path";
import { operationFailedMessage } from "../constants/constants.js";

export const printDirContent = async (dirName) => {
  try {
    const allContent = await readdir(dirName);

    const directoriesList = [];
    const filesList = [];

    for (const item of allContent) {
      const fileType = (await stat(resolve(dirName, item))).isDirectory()
        ? "directory"
        : "file";
      (fileType === "directory" ? directoriesList : filesList).push({
        Name: item,
        Type: fileType,
      });
    }

    const [sortedDirectoriesList, sortedFilesList] = [directoriesList, filesList].map(list => list.sort((a, b) => {
        if (a.Name < b.Name) {
          return -1;
        }
        if (a.Name > b.Name) {
          return 1;
        }
        return 0;
      }));

    console.table(sortedDirectoriesList.concat(sortedFilesList));
  } catch (e) {
    process.stdin.write(`${operationFailedMessage}: ${e.message}`);
  }
};
