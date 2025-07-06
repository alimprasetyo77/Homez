import { z } from "zod";

export interface IUpload {
  url: string;
  field: string;
  publicId: string;
}

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const uploadPhotoSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, {
      message: "Max file size is 2MB.",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, and .png formats are supported.",
    }),
});
