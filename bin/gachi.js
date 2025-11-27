#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { compile } from "../src/compiler.js";

const file = process.argv[2];

if (!file) {
  console.log("Usage: gachi <file.gachi>");
  process.exit(1);
}

const code = fs.readFileSync(path.resolve(file), "utf8");

const js = compile(code);

eval(js);
