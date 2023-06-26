import { resolve } from "path";
import { readFile } from "node:fs/promises";
import crypto from "crypto";

export const createHash = async (pathToFile) => {
  const fullFilePath = resolve(process.env.entry, pathToFile);

  const content = await readFile(fullFilePath, { encoding: "utf8" });
  const hash = crypto.createHash("sha256").update(content).digest("hex");
  process.stdout.write(hash);
};
