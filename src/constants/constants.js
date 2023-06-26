import { EOL } from "os";

const welcomeMessage = (userName) =>
  `Welcome to the File Manager, ${userName}!${EOL}`;
const goodbyeMessage = (userName) =>
  `Thank you for using File Manager, ${userName}, goodbye!${EOL}`;
const currentDirectoryMessage = (dirName) =>
  `${EOL}You currently in ${dirName}${EOL}`;

const defaultUserName = "Username";

const userNamePrefix = "--username=";

const commandsList = {
  exit: ".exit",
  ls: "ls",
  up: "up",
  cd: "cd ",
  cat: "cat ",
  add: "add ",
  rn: "rn ",
  hash: "hash ",
  cp: "cp ",
  mv: "mv ",
  rm: "rm ",
  compress: "compress ",
  decompress: "decompress ",
  os: "os --"
};

const operationFailedMessage = "Operation failed";
const invalidInputErrorMessage = `${EOL}Invalid input${EOL}`

export {
  welcomeMessage,
  goodbyeMessage,
  currentDirectoryMessage,
  defaultUserName,
  userNamePrefix,
  commandsList,
  operationFailedMessage,
  invalidInputErrorMessage
};
