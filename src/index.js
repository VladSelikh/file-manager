import readlinePromises from "node:readline/promises";
import { homedir } from "os";
import {
  userNamePrefix,
  defaultUserName,
  welcomeMessage,
  goodbyeMessage,
  commandsList,
  currentDirectoryMessage,
  invalidInputErrorMessage,
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
import { parseCommandString } from "./helpers/parseCommand.js";

let userName = defaultUserName;
process.env.entry = homedir();

const { stdin, stdout } = process;

const argumentWithUserName = process.argv.find((item) =>
  item.startsWith(userNamePrefix)
);
if (argumentWithUserName) {
  const specifiedUserName = argumentWithUserName.replace(userNamePrefix, "");
  userName = specifiedUserName ? specifiedUserName : defaultUserName;
}

stdout.write(welcomeMessage(userName));

const rl = readlinePromises.createInterface({
  input: stdin,
  output: stdout,
});

rl.on("line", async (input) => {
  const commandSpecified = Object.values(commandsList).find((item) =>
    input.trim().startsWith(item)
  );

  try {
    const parameters = parseCommandString(commandSpecified, input.trim());

    switch (commandSpecified) {
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
        await goToDirectory(input.replace(commandSpecified, ""));
        break;
      case commandsList.cat:
        read(input.replace(commandSpecified, ""));
        break;
      case commandsList.add:
        await create(input.replace(commandSpecified, ""));
        break;
      case commandsList.rn:
        await rename(...parameters);
        break;
      case commandsList.cp:
        await copy(...parameters);
        break;
      case commandsList.mv:
        await move(...parameters);
        break;
      case commandsList.rm:
        await remove(input.replace(commandSpecified, ""));
        break;
      case commandsList.hash:
        await createHash(input.replace(commandSpecified, ""));
        break;
      case commandsList.os:
        getOSInfo(input.replace(commandSpecified, ""));
        break;
      case commandsList.compress:
        await compress(...parameters);
        break;
      case commandsList.decompress:
        await decompress(...parameters);
        break;
      default:
        stdout.write(invalidInputErrorMessage);
    }
  } catch (e) {
    stdout.write(e.message);
  }

  stdout.write(currentDirectoryMessage(env.entry));
});

rl.on("close", () => {
  stdout.write(goodbyeMessage(userName));
});
