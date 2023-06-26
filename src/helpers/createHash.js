import { resolve } from "path";
import { readFile } from "node:fs/promises";
import crypto from "crypto";
import { operationFailedMessage } from "../constants/constants.js";

export const createHash = async (pathToFile) => {
  const fullFilePath = resolve(process.env.entry, pathToFile);

  try {
    const content = await readFile(fullFilePath, { encoding: "utf8" });
    const hash = crypto.createHash("sha256").update(content).digest("hex");
    process.stdout.write(hash);
  } catch (e) {
    // ToDo: leave operationFailedMessage only
    process.stdout.write(`${operationFailedMessage}: ${e.message}`);
  }
};
