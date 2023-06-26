import { EOL } from "os";

const welcomeMessage = (userName) =>
  `Welcome to the File Manager, ${userName}!${EOL}`;
const goodbyeMessage = (userName) =>
  `Thank you for using File Manager, ${userName}, goodbye!${EOL}`;

const defaultUserName = "Username";

const userNamePrefix = "--username=";

const commandsList = { exit: ".exit", ls: "ls" };

const operationFailedMessage = "Operation failed";

export {
  welcomeMessage,
  goodbyeMessage,
  defaultUserName,
  userNamePrefix,
  commandsList,
  operationFailedMessage,
};
