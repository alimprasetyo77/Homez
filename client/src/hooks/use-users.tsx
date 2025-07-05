import { deleteUser, deleteUserById, getUserById, getUsers, updateUser } from "@/services/user-service";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
interface IOptionsProps {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
  onSettled?: (data: any) => void;
  onMutate?: (data: any) => void;
  enabled?: boolean;
}
export const useUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  });
  return {
    users: data?.data,
    isLoading,
  };
};

export const useUser = (userId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    refetchOnMount: false,
  });
  return {
    user: data?.data,
    isLoading,
  };
};

export const useUpdateUser = (options?: IOptionsProps) => {
  const queryClient = useQueryClient();
  const { resetUser } = useAuthStore();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: ({ message, data }) => {
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
      resetUser(data);
      toast.success(message);
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      toast.error(`${error}`);
    },
  });
  return {
    updateUserAsync: mutation.mutateAsync,
    pendingUpdateUser: mutation.isPending,
  };
};

export const useDeleteUserById = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (userId: string) => deleteUserById(userId),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });
  return {
    deleteUserByID: mutation.mutateAsync,
    pendingDeleteUser: mutation.isPending,
  };
};
export const useDeleteUserLogin = () => {
  const { clearState } = useAuthStore();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess({ message }) {
      toast.success(message);
      clearState();
    },
    onError(error) {
      toast.error(`${error}`);
    },
  });
  return {
    deleteUserByLogin: mutation.mutateAsync,
    pendingDeleteUser: mutation.isPending,
  };
};
