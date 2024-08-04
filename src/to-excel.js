#!/usr/bin/env node
import { program } from "commander";
import { mergeJsonFilesAndExportToExcel } from "./util.js";

program
  .version("1.0.0")
  .description("Merge multiple JSON files and export to Excel")
  .option(
    "-f, --files <paths>",
    "Comma-separated list of JSON file paths",
    (list) => list.split(",")
  )
  .option(
    "-k, --keys <keys>",
    "Comma-separated list of corresponding keys",
    (list) => list.split(",")
  )
  .option("-o, --output [path]", "Output Excel directory path", process.cwd())
  .parse(process.argv);

const options = program.opts();

mergeJsonFilesAndExportToExcel(options.files, options.keys, options.output);
