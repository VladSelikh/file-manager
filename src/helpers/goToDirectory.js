import { resolve } from "path";
import { stat } from "fs/promises";
import { access, constants } from "node:fs/promises";
import { operationFailedMessage } from "../constants/constants.js";

export const goToDirectory = async (dirName) => {
  const fullDirectoryPath = resolve(process.env.entry, dirName);
  try {
    await access(fullDirectoryPath, constants.F_OK);
    if ((await stat(fullDirectoryPath)).isDirectory()) {
      process.env.entry = fullDirectoryPath;
    } else throw new Error("Specified path is a file, not a directory.");
  } catch (e) {
    // ToDo: leave operationFailedMessage only
    process.stdout.write(`${operationFailedMessage}: ${e.message}`);
  }
};
