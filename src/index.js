import readlinePromises from "node:readline/promises";
import { EOL, homedir } from "os";
import {
  userNamePrefix,
  defaultUserName,
  welcomeMessage,
  goodbyeMessage,
  commandsList,
} from "./constants/constants.js";
import { printDirContent } from "./helpers/printDirContent.js";
import { goUp } from "./helpers/goUp.js";

let userName = defaultUserName;
let entryPoint = homedir();

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
    case commandsList.exit:
      rl.close();
      process.exit();
    case commandsList.ls:
      await printDirContent(entryPoint);
      break;
    case commandsList.up:
      entryPoint = goUp(entryPoint);
      break;
    default:
      process.stdout.write("Invalid input");
  }
  process.stdout.write(EOL);
  process.stdout.write(`You currently in ${entryPoint}`);
  process.stdout.write(EOL);
});

rl.on("close", () => {
  process.stdout.write(goodbyeMessage(userName));
});

rl.on("error", (error) => {
  console.log(error);
});

export { entryPoint };
