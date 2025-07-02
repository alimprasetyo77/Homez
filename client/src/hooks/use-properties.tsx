import {
  createProperty,
  deleteProperty,
  getLocation,
  getMyProperties,
  getPopular,
  getProperties,
  getPropertyById,
  searchOrFilterProperties,
  updateProperty,
} from "@/services/property-service";
import {
  ICreateProperty,
  ISearchOrFilterProperties,
  IUpdateProperty,
  PropertyType,
} from "@/types/property-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
interface IOptionsProps {
  onSuccess?: (data: any) => void;
  onError?: (err: any) => void;
  onSettled?: (data: any) => void;
  onMutate?: (data: any) => void;
}

export const useSearchFilterProperties = (filteredProperties: ISearchOrFilterProperties) => {
  const { data, refetch } = useQuery({
    queryKey: ["searchOrFilter-properties", filteredProperties],
    queryFn: () => searchOrFilterProperties(filteredProperties),
    enabled: false,
  });
  return {
    properties: data,
    fetchSearchFilterProperties: refetch,
  };
};

export const useLocationProperties = (filteredProperties: ISearchOrFilterProperties) => {
  const { data } = useQuery({
    queryKey: ["location-properties", filteredProperties],
    queryFn: () => getLocation(),
  });
  return {
    locationProperties: data?.data,
  };
};

export const usePopularProperties = (activeLinkOnProperties: PropertyType) => {
  const { data, isLoading } = useQuery({
    queryKey: ["properties", activeLinkOnProperties],
    queryFn: () => getPopular(activeLinkOnProperties),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return {
    popularProperties: data?.data,
    isLoading,
  };
};

export const useMyProperties = (options?: IOptionsProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["properties"],
    queryFn: getMyProperties,
    ...options,
  });
  return {
    properties: data?.data,
    isLoading,
    isError,
  };
};

export const useProperties = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });
  return {
    properties: data?.data,
    isLoading,
    isError,
  };
};

export const useProperty = (propertyId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => getPropertyById(propertyId),
    enabled: Boolean(propertyId),
  });
  return {
    property: data?.data,
    isLoading,
    isError,
  };
};

export const useSaveProperty = (propertyId?: string, options?: IOptionsProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["properties"],
    mutationFn: (data: ICreateProperty | IUpdateProperty) => {
      return propertyId
        ? updateProperty(data as IUpdateProperty, propertyId)
        : createProperty(data as ICreateProperty);
    },
    onSuccess: ({ message }) => {
      options?.onSuccess?.(message);
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      if (propertyId) {
        queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
      }
      toast.success(message);
    },
    onError: ({ message }) => {
      options?.onError?.(message);
      toast.error(message);
    },
    onMutate: (data) => {
      options?.onMutate?.(data);
    },
    onSettled: (data) => {
      options?.onSettled?.(data);
    },
  });

  return {
    saveProperty: mutation.mutateAsync,
  };
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (propertyId: string) => deleteProperty(propertyId),
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });
  return {
    deleteProperty: mutation.mutateAsync,
    pendingDeleteProperty: mutation.isPending,
  };
};
