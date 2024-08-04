# Simple Convert JSON to Excel and Back

This Node.js script offers a user-friendly tool for translating JSON files into Excel and vice versa, preserving multi-language translations.

## Features

- Effortlessly convert JSON files containing translations into a single Excel sheet.
- Reverse the process, extracting translations from an Excel sheet back into separate JSON files for each language.
- Supports nested objects within JSON structures.

## Installation

1. Clone this repository or download the project files.
2. Install dependencies using npm:

   ```bash
   npm install -g
   ```

## Usage:

Convert JSON to Excel
Pass the paths to your JSON files (comma-separated) and their corresponding language codes (comma-separated) using the -f and -k flags, respectively:

```bash
i18n-export -f 'path/to/file1.json,path/to/file2.json' -k 'en,vi'
```

Replace path/to/file1.json and path/to/file2.json with the actual paths to your JSON files.
Replace en,vi with the language codes for your JSON files (e.g., en for English, vi for Vietnamese).

The generated Excel file (output.xlsx) will have the following structure:

| KEY                        | en                       | vi                      |
| -------------------------- | ------------------------ | ----------------------- |
| confirm-employment         | Confirm employment       | Xác nhận việc làm       |
| contract-page.reset-filter | Reset filter             | Xoá bộ lọc              |
| contract-page.normal       | Normal                   | Bình thường             |
| remove-contract-success    | Remove contract success! | Xóa hợp đồng thành công |

Convert Excel to JSON
Provide the path to the generated Excel file (output.xlsx) using the -i flag:

```bash
i18n-import -i 'path/to/output.xlsx'
```

Replace path/to/output.xlsx with the actual path to your Excel file.

Two separate JSON files named vi.json and en.json will be created in your project's root directory, containing the extracted translations for each language.

## Example

### JSON
- file1.json (en)
```json
 {
   "confirm-employment": "Confirm employment",
   "contract-page": {
     "reset-filter": "Reset filter",
     "normal": "Normal"
   },
   "remove-contract-success": "Remove contract success!"
 }
```
- file2.json (vi)
    ```json
      {
        "confirm-employment": "Xác nhận việc làm",
        "contract-page": {
          "reset-filter": "Xoá bộ lọc",
          "normal": "Bình thường"
        },
        "remove-contract-success": "Xóa hợp đồng thành công"
      }
    ```

### Command (convert to Excel)

- ```bash 
  i18n-export -f 'file1.json,file2.json' -k 'en,vi'
  ```

#### Output Excel (output.xlsx)

| KEY                        | en                       | vi                      |
| -------------------------- | ------------------------ | ----------------------- |
| confirm-employment         | Confirm employment       | Xác nhận việc làm       |
| contract-page.reset-filter | Reset filter             | Xoá bộ lọc              |
| contract-page.normal       | Normal                   | Bình thường             |
| remove-contract-success    | Remove contract success! | Xóa hợp đồng thành công |

### Command (convert back to JSON)

- ```bash 
  i18n-import -i 'output.xlsx'
  ```

- Output JSON files (vi.json and en.json)
- (content will be the same as the original JSON files)

[Additional Notes]
The script assumes your JSON files have valid JSON syntax.
Ensure the Excel file generated (output.xlsx) is not modified manually, as this may affect the JSON conversion process.
