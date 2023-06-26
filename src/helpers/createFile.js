import { resolve, dirname, basename } from "path";
import { open, readdir } from "node:fs/promises";
import { operationFailedMessage } from "../constants/constants.js";

export const create = async (pathToFile) => {
  const fullFilePath = resolve(process.env.entry, pathToFile);
  const fileName = basename(fullFilePath);

  try {
    const fileAlreadyExists = (
      await readdir(dirname(fullFilePath), { withFileTypes: true })
    ).some((item) => item.name === fileName && item.isFile());

    if (fileAlreadyExists) {
      throw new Error(`File ${fullFilePath} already exists.`);
    } else {
      await (await open(fullFilePath, "w")).close();
    }
  } catch (e) {
    // ToDo: leave operationFailedMessage only
    process.stdout.write(`${operationFailedMessage}: ${e.message}`);
  }
};
