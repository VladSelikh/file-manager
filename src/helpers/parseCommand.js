import {
  commandsList,
  invalidInputErrorMessage,
} from "../constants/constants.js";
const { ls, up, exit, rn, cp, mv, compress, decompress } = commandsList;

export const parseCommandString = (command, string) => {
  if ([ls, up, exit].includes(command)) {
    if (!(command === string)) throw new Error(invalidInputErrorMessage);
  }
  if ([cp, mv, rn, compress, decompress].includes(command)) {
    const parametersPart = string.replace(command, "");
    let parameters;

    if (parametersPart.includes('" "')) {
      parameters = parametersPart
        .split('" "')
        .map((item) => item.replace(/(^"|"$)/g, ""));
    } else {
      parameters = parametersPart.split(" ");
    }

    if (parameters.length === 2) {
      return parameters;
    }
    throw new Error(invalidInputErrorMessage);
  }
};
