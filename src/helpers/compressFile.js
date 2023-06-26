import { createBrotliCompress } from "zlib";
import { resolve, basename } from "path";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { access, constants } from "node:fs/promises";

export const compress = async (pathToFile, pathToDestinationFolder) => {
  const fileName = resolve(process.env.entry, pathToFile);
  const destinationFileName = resolve(
    process.env.entry,
    pathToDestinationFolder,
    `${basename(fileName)}.br`
  );

  const brotli = createBrotliCompress();

  await access(fileName, constants.F_OK);
  await pipeline(
    createReadStream(fileName, { encoding: "utf8" }),
    brotli,
    createWriteStream(destinationFileName)
  );
};
