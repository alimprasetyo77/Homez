import {
  createProperty,
  deleteProperty,
  getCountPropertyEachCities,
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
  enabled?: boolean;
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

export const useLocationProperties = () => {
  const { data } = useQuery({
    queryKey: ["location-properties"],
    queryFn: () => getLocation(),
    refetchOnMount: false,
  });
  return {
    locationProperties: data?.data,
  };
};

export const usePopularProperties = (activeLinkOnProperties: PropertyType) => {
  const { data, isLoading } = useQuery({
    queryKey: ["properties", activeLinkOnProperties],
    queryFn: () => getPopular(activeLinkOnProperties),
    staleTime: 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return {
    popularProperties: data?.data,
    isLoading,
  };
};
export const usePropertyOfCities = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["PropertyOfCities"],
    queryFn: () => getCountPropertyEachCities(),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return {
    propertyOfCities: data?.data,
    isLoading,
  };
};

export const useMyProperties = (options?: IOptionsProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["properties"],
    queryFn: getMyProperties,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
  return {
    properties: data?.data,
    isLoading,
    isError,
  };
};

export const useProperties = (options?: IOptionsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
    ...options,
    staleTime: 1000 * 60,
    refetchOnMount: false,
  });
  return {
    properties: data?.data,
    isLoading,
  };
};

export const useProperty = (propertyId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => getPropertyById(propertyId),
    enabled: Boolean(propertyId),
    refetchOnMount: false,
  });
  return {
    property: data?.data,
    isLoading,
    error,
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
