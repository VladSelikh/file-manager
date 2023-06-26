import { resolve } from "path";
import { createReadStream } from "node:fs";
import {
  currentDirectoryMessage,
  operationFailedMessage,
} from "../constants/constants.js";

export const read = (pathToFile) => {
  const fileName = resolve(process.env.entry, pathToFile);
  const stream = createReadStream(fileName, { encoding: "utf8" });

  stream
    .on("data", (chunk) => {
      process.stdout.write(chunk);
    })
    .on("close", () => {
      process.stdout.write(currentDirectoryMessage(process.env.entry));
    })
    .on("error", (error) => {
      process.stdout.write(`${operationFailedMessage}: ${error.message}`);
    });
};
