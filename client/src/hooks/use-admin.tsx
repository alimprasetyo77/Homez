import { approveProperty, rejectProperty } from "@/services/admin-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useApproveProperty = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (propertyId: string) => approveProperty(propertyId),
    onSuccess: (res, propertyId) => {
      toast.success(res.message);
      queryClient.refetchQueries({ queryKey: ["properties"] });
      queryClient.refetchQueries({ queryKey: ["property", propertyId] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
  return {
    approveProperty: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};
export const useRejectProperty = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (propertyId: string) => rejectProperty(propertyId),
    onSuccess: (res, propertyId) => {
      toast.success(res.message);
      queryClient.refetchQueries({ queryKey: ["properties"] });
      queryClient.refetchQueries({ queryKey: ["property", propertyId] });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
  return {
    rejectProperty: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};
