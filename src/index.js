const welcomeMessage = (userName) =>
  `Welcome to the File Manager, ${userName}!`;
const defaultUserName = "Username";
const prefix = "--username=";

const argumentWithUserName = process.argv.find((item) =>
  item.startsWith(prefix)
);
if (argumentWithUserName) {
  const userName = argumentWithUserName.replace(prefix, "");
  process.stdout.write(welcomeMessage(userName ? userName : defaultUserName));
} else process.stdout.write(welcomeMessage(defaultUserName));
