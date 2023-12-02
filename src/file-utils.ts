import * as fs from "fs";

export const readJsonContent = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent) as {
    name: string;
    shortDescription?: string;
    description?: string;
    type?: string;
    colour?: string;
  };
};
