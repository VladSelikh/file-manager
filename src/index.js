import readlinePromises from "node:readline/promises";
import { EOL, homedir } from "os";
import {
  userNamePrefix,
  defaultUserName,
  welcomeMessage,
  goodbyeMessage,
  commandsList,
  currentDirectoryMessage,
} from "./constants/constants.js";
import { printDirContent } from "./helpers/printDirContent.js";
import { goUp } from "./helpers/goUp.js";
import { goToDirectory } from "./helpers/goToDirectory.js";
import { read } from "./helpers/readFile.js";
import { create } from "./helpers/createFile.js";
import { rename } from "./helpers/renameFile.js";
import { createHash } from "./helpers/createHash.js";
import { copy } from "./helpers/copyFile.js";
import { move } from "./helpers/moveFile.js";
import { remove } from "./helpers/deleteFile.js";
import { compress } from "./helpers/compressFile.js";
import { decompress } from "./helpers/decompressFile.js";
import { getOSInfo } from "./helpers/os.js";

let userName = defaultUserName;
process.env.entry = homedir();

const argumentWithUserName = process.argv.find((item) =>
  item.startsWith(userNamePrefix)
);
if (argumentWithUserName) {
  const specifiedUserName = argumentWithUserName.replace(userNamePrefix, "");
  userName = specifiedUserName ? specifiedUserName : defaultUserName;
}

process.stdout.write(welcomeMessage(userName));

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", async (input) => {
  const commandSpecified = Object.values(commandsList).find((item) =>
    input.trim().startsWith(item)
  );

  switch (commandSpecified) {
    // ToDo: parse command line string
    case commandsList.exit:
      rl.close();
      process.exit();
    case commandsList.ls:
      await printDirContent();
      break;
    case commandsList.up:
      goUp();
      break;
    case commandsList.cd:
      await goToDirectory(input.replace(`${commandSpecified} `, ""));
      break;
    case commandsList.cat:
      read(input.replace(`${commandSpecified} `, ""));
      break;
    case commandsList.add:
      await create(input.replace(`${commandSpecified} `, ""));
      break;
    case commandsList.rn:
      await rename(...input.replace(`${commandSpecified} `, "").split(" "));
      break;
    case commandsList.cp:
      copy(...input.replace(`${commandSpecified} `, "").split(" "));
      break;
    case commandsList.mv:
      move(...input.replace(`${commandSpecified} `, "").split(" "));
      break;
    case commandsList.rm:
      await remove(input.replace(`${commandSpecified} `, ""));
      break;
    case commandsList.hash:
      await createHash(input.replace(`${commandSpecified} `, ""));
      break;
    case commandsList.os:
      getOSInfo(input.replace(commandSpecified, ""));
      break;
    case commandsList.compress:
      compress(...input.replace(`${commandSpecified} `, "").split(" "));
      break;
    case commandsList.decompress:
      decompress(...input.replace(`${commandSpecified} `, "").split(" "));
      break;
    default:
      process.stdout.write(`${EOL}Invalid input${EOL}`);
      process.stdout.write(currentDirectoryMessage(process.env.entry));
  }

  if (
    [
      commandsList.cd,
      commandsList.ls,
      commandsList.up,
      commandsList.add,
      commandsList.rn,
      commandsList.rm,
      commandsList.hash,
      commandsList.os,
    ].includes(commandSpecified)
  ) {
    process.stdout.write(currentDirectoryMessage(process.env.entry));
  }
});

rl.on("close", () => {
  process.stdout.write(goodbyeMessage(userName));
});
