import fs from "fs";
import path from "path";

import { OUTPUT_PATH } from "./constants.js";

const README_PATH = path.join(OUTPUT_PATH, "README.md");
const UPDATE_META_PATH = path.join(OUTPUT_PATH, "metadata", "updates.json");

export function logUpdate(type: "markdown" | "markdown_separate" | "json") {
  const id = `${type}-last-updated`;
  const readme = fs.readFileSync(README_PATH, "utf-8");
  const timestamp = new Date();

  const updatedReadme = readme.replace(
    new RegExp(`<span id="${id}">.*?</span>`),
    `<span id="${id}">${timestamp.toUTCString()}</span>`
  );

  fs.writeFileSync(README_PATH, updatedReadme);

  const updates = JSON.parse(fs.readFileSync(UPDATE_META_PATH, "utf-8"));
  updates[type] = timestamp;
  fs.writeFileSync(UPDATE_META_PATH, JSON.stringify(updates, null, 2));
}
