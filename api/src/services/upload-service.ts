import formidable from "formidable";
import { ResponseError } from "../utils/response-error";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

export class UploadService {
  private static getPublicId(imageURL: string): string {
    const fileName = imageURL.split("upload/")[1].split("/");
    fileName.shift();

    const result = path.parse(fileName.join("/") || "");
    return `${result.dir}/${result.name}`;
  }

  static async create(request: formidable.Files) {
    const file = request.file?.[0];
    if (!file) throw new ResponseError(400, "No file uploaded!");

    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "homez_file/property/photos",
    });

    return { url: result.secure_url };
  }

  static async delete(request: { url: string }) {
    const url = request.url;
    if (!url) throw new ResponseError(400, "Image url needed!");
    const publicId = this.getPublicId(url);
    const { result } = await cloudinary.uploader.destroy(publicId);
    if (result == "not found") throw new ResponseError(404, "invalid image url!");
  }
}
