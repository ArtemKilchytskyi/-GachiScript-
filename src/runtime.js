import { compile } from "./compiler.js";

export function runGachi(code) {
  const js = compile(code);
  return eval(js);
}
