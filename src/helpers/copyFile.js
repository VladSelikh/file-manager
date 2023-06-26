import { resolve, basename } from "path";
import { createReadStream, createWriteStream } from "node:fs";
import {
  currentDirectoryMessage,
  operationFailedMessage,
} from "../constants/constants.js";

export const copy = (pathToFile, newDirPath) => {
  const fullFilePath = resolve(process.env.entry, pathToFile);
  const fileName = basename(fullFilePath);

  const fullNewFilePath = resolve(process.env.entry, newDirPath, fileName);

  createReadStream(fullFilePath)
    .on("error", (error) => {
      process.stdout.write(`${operationFailedMessage}: ${error.message}`);
    })
    .pipe(createWriteStream(fullNewFilePath))
    .on("close", () => {
      process.stdout.write(currentDirectoryMessage(process.env.entry));
    })
    .on("error", (error) => {
      process.stdout.write(`${operationFailedMessage}: ${error.message}`);
    });
};
