import { resolve } from "path";
import { unlink } from "node:fs/promises";

export const remove = async (pathToFile) => {
  const fullFilePath = resolve(process.env.entry, pathToFile);

  await unlink(fullFilePath);
};
