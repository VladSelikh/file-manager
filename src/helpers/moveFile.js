import { resolve, basename } from "path";
import { createReadStream, createWriteStream } from "node:fs";
import { unlink } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { access, constants } from "node:fs/promises";

export const move = async (pathToFile, newDirPath) => {
  const fullFilePath = resolve(process.env.entry, pathToFile);
  const fileName = basename(fullFilePath);

  const fullNewFilePath = resolve(process.env.entry, newDirPath, fileName);

  await access(fullFilePath, constants.F_OK);
  await pipeline(
    createReadStream(fullFilePath, { encoding: "utf8" }),
    createWriteStream(fullNewFilePath)
  );

  await unlink(fullFilePath);
};
