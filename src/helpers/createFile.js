import { resolve, dirname, basename } from "path";
import { open, readdir } from "node:fs/promises";

export const create = async (pathToFile) => {
  const fullFilePath = resolve(process.env.entry, pathToFile);
  const fileName = basename(fullFilePath);

  const fileAlreadyExists = (
    await readdir(dirname(fullFilePath), { withFileTypes: true })
  ).some((item) => item.name === fileName && !item.isDirectory());

  if (fileAlreadyExists) {
    throw new Error(`File ${fullFilePath} already exists.`);
  } else {
    await (await open(fullFilePath, "w")).close();
  }
};
