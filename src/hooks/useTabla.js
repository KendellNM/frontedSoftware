import { useQuery } from "@tanstack/react-query";
import { useState, useCallback } from "react";

/**
 * Hook universal para manejar datos de cualquier tabla con React Query
 * 
 * @param {string} queryKey - Nombre único de la query
 * @param {Object} service - Servicio que extiende BaseService
 * @param {Object} initialParams - Parámetros iniciales
 * @param {Object} queryOptions - Opciones de React Query
 */
export const useTableData = (
  queryKey,
  service,
  initialParams = {},
  queryOptions = {}
) => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "",
    sortOrder: "asc",
    ...initialParams
  });

  const query = useQuery({
    queryKey: [queryKey, params],
    queryFn: () => service.getAll(params),
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000,
    ...queryOptions
  });

  // Handlers
  const handlePageChange = useCallback((page) => {
    setParams(prev => ({ ...prev, page }));
  }, []);

  const handleSearch = useCallback((search) => {
    setParams(prev => ({ ...prev, search, page: 1 }));
  }, []);

  const handleSort = useCallback((sortBy) => {
    setParams(prev => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === "asc" ? "desc" : "asc"
    }));
  }, []);

  const handleFilterChange = useCallback((filters) => {
    setParams(prev => ({ ...prev, ...filters, page: 1 }));
  }, []);

  const handleLimitChange = useCallback((limit) => {
    setParams(prev => ({ ...prev, limit, page: 1 }));
  }, []);

  return {
    data: query.data?.data || [],
    pagination: query.data?.pagination || {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      pageSize: params.limit
    },

    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,

    params,

    handlePageChange,
    handleSearch,
    handleSort,
    handleFilterChange,
    handleLimitChange,

    refetch: query.refetch,
    remove: query.remove
  };
};

export default useTableData;