import { resolve } from "path";
import { createReadStream } from "node:fs";
import { currentDirectoryMessage, operationFailedMessage } from "../constants/constants.js";

export const read = (pathToFile) => {
  const fileName = resolve(process.env.entry, pathToFile);

  try {
    createReadStream(fileName, { encoding: "utf8" })
      .on("data", (chunk) => {
        process.stdout.write(chunk);
      })
      .on("close", () => {
        process.stdout.write(currentDirectoryMessage(process.env.entry));
      });
  } catch (e) {
    // ToDo: leave operationFailedMessage only
    process.stdout.write(`${operationFailedMessage}: ${e.message}`);
  }
};
