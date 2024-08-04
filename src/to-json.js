#!/usr/bin/env node
import xlsx from "xlsx";
import fs from "fs/promises";
import { program } from "commander";
import { setNestedValue } from "./util.js";
program
  .version("1.0.0")
  .description("Convert Excel to JSON translation files")
  .requiredOption("-i, --input <path>", "Path to Excel file")
  .parse(process.argv);

const options = program.opts();

async function splitExcelToJSON(excelFile) {
  try {
    const workbook = xlsx.readFile(excelFile);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // get header from worksheet row 1
    const data = xlsx.utils.sheet_to_json(worksheet);
    const header = xlsx.utils.sheet_to_row_object_array(worksheet, {
      header: 1,
      raw: true,
    });

    const languages = header[0].slice(1);
    let languageData = {};
    data.forEach((row, idx) => {
      languages.forEach((language) => {
        if (!languageData[language]) {
          languageData[language] = {};
        }
        setNestedValue(
          languageData[language],
          header[idx + 1][0],
          row[language]
        );
      });
    });
    for (const language in languageData) {
      await fs.writeFile(
        `${language}.json`,
        JSON.stringify(languageData[language], null, 2)
      );
    }
    console.log("\x1b[32m%s\x1b[0m", "Converted successfully");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", "Failed to convert", error);
  }
}

splitExcelToJSON(options.input);
