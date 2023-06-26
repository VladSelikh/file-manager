import { join } from "path";

export const goUp = () => {
  process.env.entry = join(process.env.entry, "../");
};
