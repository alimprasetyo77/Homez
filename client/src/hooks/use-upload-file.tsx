import { deletePhoto, getPublicIdByField, uploadPhoto } from "@/services/upload-service";
import { Response } from "@/types/type";
import { IUpload } from "@/types/upload.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface IUseUploadFileOptions {
  onSuccess?: (data: Response<IUpload>) => void;
  onError?: (err: Error | null) => void;
  onSettled?: (data: Response<IUpload>) => void;
  onMutate?: (data: { file: File; field: string }) => void;
}
interface IUseDeleteUploadFile {
  onSuccess?: (data: { field: string }) => void;
  onError?: (err: Error | null) => void;
}
export const useUploadFile = (options?: IUseUploadFileOptions) => {
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationKey: ["upload"],
    mutationFn: ({ file, field }: { file: File; field: string }) =>
      uploadPhoto(file, field, (percent) => setProgress(percent)),
    onMutate: (data) => {
      setProgress(0);
      options?.onMutate?.(data);
    },
    onSuccess: (field) => {
      setProgress(100);
      options?.onSuccess?.(field);
    },
    onError: (err) => {
      setProgress(0);
      options?.onError?.(err);
    },
    onSettled: (data) => {
      options?.onSettled?.(data!);
    },
  });

  return {
    uploadAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    progress,
    error: mutation.error,
    field: mutation.variables?.field ?? "",
  };
};

export const useDeleteUploadFile = (options?: IUseDeleteUploadFile) => {
  const [field, setField] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["upload"],
    mutationFn: async ({ field, propertyId }: { field: string; propertyId?: string }) => {
      const { data } = await getPublicIdByField(field, propertyId);
      return await deletePhoto(data.publicId, field, propertyId);
    },
    onMutate: ({ field }: { field: string }) => {
      setField(field);
    },
    onSuccess: () => {
      options?.onSuccess?.({ field });
      queryClient.invalidateQueries({ queryKey: ["upload"] });
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    deleteUploadFileAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
