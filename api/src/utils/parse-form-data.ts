import { Request } from "express";
import formidable from "formidable";
import path from "path";
export interface IParseFormData {
  fields: formidable.Fields;
  files: formidable.Files;
}

export function parseFormData(req: Request): Promise<IParseFormData> {
  const form = formidable({ multiples: false, keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        fields = normalizeFields(fields);
        resolve({ fields, files });
      }
    });
  });
}

function normalizeFields(fields: formidable.Fields) {
  const result: Record<string, any> = {};
  for (const key in fields) {
    const value = Array.isArray(fields[key]) ? fields[key][0] : fields[key];

    if (typeof value === "string") {
      try {
        result[key] = JSON.parse(value);
      } catch {
        result[key] = value;
      }
    } else {
      result[key] = value;
    }
  }
  return result;
}

export const getPublicId = (imageURL: string): string => {
  const fileName = imageURL.split("upload/")[1].split("/");
  fileName.shift();

  const result = path.parse(fileName.join("/") || "");
  return `${result.dir}/${result.name}`;
};
