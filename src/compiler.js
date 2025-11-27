import { dict as nestedDict } from "./dictionary.js";
import { flattenDict } from "./utils/flattenDict.js";

const dict = flattenDict(nestedDict);

export function compile(code) {
  return code
    .split(/\b/)
    .map((word) => dict[word] || word)
    .join("");
}
