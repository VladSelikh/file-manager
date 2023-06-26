import { resolve } from "path";
import { unlink } from "node:fs/promises";
import { operationFailedMessage } from "../constants/constants.js";

export const remove = async (pathToFile) => {
  const fullFilePath = resolve(process.env.entry, pathToFile);
  try {
    await unlink(fullFilePath);
  } catch (e) {
    // ToDo: leave operationFailedMessage only
    process.stdout.write(`${operationFailedMessage}: ${e.message}`);
  }
};
