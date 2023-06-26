import { resolve, dirname } from "path";
import fsPromises from "node:fs/promises";

export const rename = async (pathToFile, newFileName) => {
  const fullPath = resolve(process.env.entry, pathToFile);
  const newFullPath = resolve(dirname(fullPath), newFileName);

  await fsPromises.rename(fullPath, newFullPath);
};
