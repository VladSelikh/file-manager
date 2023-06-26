import { resolve } from "path";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { access, constants } from "node:fs/promises";

export const read = async (pathToFile) => {
  const fileName = resolve(process.env.entry, pathToFile);

  await access(fileName, constants.F_OK);
  await pipeline(
    createReadStream(fileName, { encoding: "utf8" }),
    brotli,
    process.stdout
  );
};
