import { z } from "zod";
const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export class UploadValidation {
  static readonly create = z.object({
    originalFilename: z.string(),
    mimetype: z.string().refine((type) => ACCEPTED_IMAGE_TYPES.includes(type), {
      message: "Only .jpg, .jpeg, and .png formats are supported.",
    }),
    size: z.number().max(MAX_UPLOAD_SIZE, {
      message: `Max file size is ${MAX_MB}MB.`,
    }),
    filepath: z.string(),
  });
}
