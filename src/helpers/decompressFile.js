import { createBrotliDecompress } from "zlib";
import { resolve, basename } from "path";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { access, constants } from "node:fs/promises";

export const decompress = async (pathToFile, pathToDestinationFolder) => {
  const fileName = resolve(process.env.entry, pathToFile);
  const destinationFileName = resolve(
    process.env.entry,
    pathToDestinationFolder,
    basename(fileName).replace(".br", "")
  );

  const brotli = createBrotliDecompress();

  await access(fileName, constants.F_OK);
  await pipeline(
    createReadStream(fileName),
    brotli,
    createWriteStream(destinationFileName)
  );
};
