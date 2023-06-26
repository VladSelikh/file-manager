import { EOL, homedir, userInfo, cpus } from "os";

export const getOSInfo = (parameter) => {
  switch (parameter) {
    case "EOL":
      console.log(JSON.stringify(EOL));
      break;
    case "homedir":
      console.log(homedir());
      break;
    case "username":
      console.log(userInfo().username);
      break;
    case "architecture":
      console.log(process.arch);
      break;
    case "cpus":
      cpus().forEach((item, index) => {
        console.log(
          `CPU ${index + 1}: ${item.model.trim()}, speed - ${
            item.speed * 1000
          } GHz`
        );
      });
      break;
    default:
      process.stdout.write(`${EOL}Invalid input${EOL}`);
  }
};
