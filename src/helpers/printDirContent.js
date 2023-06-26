import { readdir } from "node:fs/promises";

export const printDirContent = async () => {
  const directoriesList = [];
  const filesList = [];

  (await readdir(process.env.entry, { withFileTypes: true })).forEach(
    (item) => {
      (item.isDirectory() ? directoriesList : filesList).push({
        Name: item.name,
        Type: item.isDirectory() ? "directory" : "file",
      });
    }
  );

  const [sortedDirectoriesList, sortedFilesList] = [
    directoriesList,
    filesList,
  ].map((list) => {
    return list.sort((a, b) => {
      if (a.Name < b.Name) {
        return -1;
      }
      if (a.Name > b.Name) {
        return 1;
      }
      return 0;
    });
  });

  console.table(sortedDirectoriesList.concat(sortedFilesList));
};
