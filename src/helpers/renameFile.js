import { resolve, dirname } from "path";
import fsPromises from "node:fs/promises";
import { operationFailedMessage } from "../constants/constants.js";

export const rename = async (pathToFile, newFileName) => {
  const fullPath = resolve(process.env.entry, pathToFile);
  const newFullPath = resolve(dirname(fullPath), newFileName);

  try {
    await fsPromises.rename(fullPath, newFullPath);
  } catch (e) {
    // ToDo: leave operationFailedMessage only
    process.stdout.write(`${operationFailedMessage}: ${e.message}`);
  }
};
