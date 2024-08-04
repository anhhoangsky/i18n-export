import { mergeJsonFilesAndExportToExcel } from "../src/util";
import xlsx from "xlsx";

// unit test by jest with param file is '../vi.json,../en.json' key is 'vi,en' output is file output.xlsx include 4 lines and 3 columns
describe("mergeJsonFilesAndExportToExcel", () => {
  it("should export excel file with 1195 lines and 3 columns", async () => {
    const files = ["./vi.json", "./en.json"];
    const keys = ["vi", "en"];
    const output = process.cwd();
    await mergeJsonFilesAndExportToExcel(files, keys, output);
    const workbook = xlsx.readFile(`${output}/output.xlsx`);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    expect(data.length).toBe(4);
    expect(Object.keys(data[0]).length).toBe(3);
    expect(data).toMatchObject([
      {
        KEY: "confirm-employment",
        en: "Confirm employment",
        vi: "Xác nhận việc làm",
      },
      {
        KEY: "contract-page.reset-filter",
        en: "Reset filter",
        vi: "Xoá bộ lọc",
      },
      { KEY: "contract-page.normal", en: "Normal", vi: "Bình thường" },
      {
        KEY: "remove-contract-success",
        en: "Remove contract success!",
        vi: "Xóa hợp đồng thành công",
      },
    ]);
  });
});
