
import xlsx from "xlsx";
import fs from "fs/promises";
export const flattenObject = function(obj, prefix = "") {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      Object.assign(result, flattenObject(obj[key], `${prefix}${key}.`));
    } else {
      result[`${prefix}${key}`] = obj[key];
    }
  }
  return result;
}

export const setNestedValue = function(obj, path, value) {
  const parts = path?.split(".");
  let current = obj;

  parts?.forEach((part, index) => {
    if (index === parts.length - 1) {
      current[part] = value ?? '';
    } else {
      current[part] = current[part] || {};
      current = current[part];
    }
  });
}

export const mergeJsonFilesAndExportToExcel = async function(files, keys, output) {
  try {
    if (files.length !== keys.length) {
      throw new Error(`Number of files and keys must be equal`);
    }

    const result = {};

    const filePromises = files.map(async (file, i) => {
      const key = keys[i];
      const data = await fs.readFile(file, "utf8");
      const jsonData = JSON.parse(data);
      const flattenedData = flattenObject(jsonData);
      result[key] = flattenedData;
    });

    await Promise.all(filePromises);

    const worksheet = xlsx.utils.json_to_sheet(
      Object.keys(result[Object.keys(result)[0]]).map((key) => {
        const row = { KEY: key };
        Object.keys(result).forEach((k) => {
          row[k] = result[k][key] || "";
        });
        return row;
      })
    );

    xlsx.utils.sheet_add_aoa(worksheet, [["KEY", ...Object.keys(result)]], {
      origin: "A1",
    });

    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Data");

    xlsx.writeFile(workbook, output + "/" + "output.xlsx");
    console.log(
      "\x1b[32m%s\x1b[0m",
      `Data has been exported to file ${output}/output.xlsx`
    );
  } catch (err) {
    console.log("\x1b[31m%s\x1b[0m", "Failed to convert", err);
  }
}
