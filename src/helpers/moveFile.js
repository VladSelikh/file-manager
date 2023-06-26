import { resolve, basename } from "path";
import { createReadStream, createWriteStream } from "node:fs";
import { unlink } from "node:fs/promises";
import {
  currentDirectoryMessage,
  operationFailedMessage,
} from "../constants/constants.js";

export const move = (pathToFile, newDirPath) => {
  const fullFilePath = resolve(process.env.entry, pathToFile);
  const fileName = basename(fullFilePath);

  const fullNewFilePath = resolve(process.env.entry, newDirPath, fileName);

  createReadStream(fullFilePath)
    .on("close", async () => {
      await unlink(fullFilePath);
    })
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
