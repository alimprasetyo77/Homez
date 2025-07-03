import { createFavorite, deleteFavorite, getMyFavorites } from "@/services/favorite-service";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMyFavorites = () => {
  const { token } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getMyFavorites(),
    staleTime: 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(token),
  });
  return {
    favorites: data?.data,
    isLoading,
  };
};

export const useCreateFavorite = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (propertyId: string) => createFavorite(propertyId),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (err: Error) => {
      toast.message(err.message);
    },
  });
  return {
    createFavorite: mutation.mutateAsync,
    isloadingCreateFavorite: mutation.isPending,
  };
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (propertyId: string) => deleteFavorite(propertyId),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
  return {
    deleteFavorite: mutation.mutateAsync,
    isloadingDeleteFavorite: mutation.isPending,
  };
};
