import { createBrotliCompress } from "zlib";
import { resolve, basename } from "path";
import { createReadStream, createWriteStream } from "node:fs";
import {
  currentDirectoryMessage,
  operationFailedMessage,
} from "../constants/constants.js";

export const compress = (pathToFile, pathToDestinationFolder) => {
  const fileName = resolve(process.env.entry, pathToFile);
  const destinationFileName = resolve(process.env.entry, pathToDestinationFolder, `${basename(fileName)}.br`);

  const brotli = createBrotliCompress();

  createReadStream(fileName, { encoding: "utf8" })
    .on("error", (error) => {
      process.stdout.write(`${operationFailedMessage}: ${error.message}`);
      process.stdout.write(currentDirectoryMessage(process.env.entry));
    })
    .pipe(brotli)
    .on("error", (error) => {
      process.stdout.write(`${operationFailedMessage}: ${error.message}`);
      process.stdout.write(currentDirectoryMessage(process.env.entry));
    })
    .pipe(createWriteStream(destinationFileName))
    .on("close", () => {
      process.stdout.write(currentDirectoryMessage(process.env.entry));
    })
    .on("error", (error) => {
      process.stdout.write(`${operationFailedMessage}: ${error.message}`);
      process.stdout.write(currentDirectoryMessage(process.env.entry));
    });
};
