import { getUsers } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";

interface IOptionsProps {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
  onSettled?: (data: any) => void;
  onMutate?: (data: any) => void;
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
