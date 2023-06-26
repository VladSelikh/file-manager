import { join } from "path";

export const goUp = (dirName) => {
  return join(dirName, "../");
};
