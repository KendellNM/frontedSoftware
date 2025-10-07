import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Hook universal para mutaciones CRUD de cualquier entidad
 * 
 * @param {string} queryKey - Nombre de la query a invalidar (ej: "users")
 * @param {Object} service - Servicio que extiende BaseService
 * @param {Object} options - Callbacks opcionales (onSuccess, onError)
 */
export const useEntityMutations = (queryKey, service, options = {}) => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data) => service.create(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      options.onCreateSuccess?.(data);
    },
    onError: (error) => {
      options.onCreateError?.(error);
    }
  });

  const update = useMutation({
    mutationFn: ({ id, data }) => service.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      if (data.id) {
        queryClient.invalidateQueries({ queryKey: [queryKey, data.id] });
      }
      options.onUpdateSuccess?.(data);
    },
    onError: (error) => {
      options.onUpdateError?.(error);
    }
  });

  const patch = useMutation({
    mutationFn: ({ id, data }) => service.patch(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      if (data.id) {
        queryClient.invalidateQueries({ queryKey: [queryKey, data.id] });
      }
      options.onPatchSuccess?.(data);
    },
    onError: (error) => {
      options.onPatchError?.(error);
    }
  });

  const remove = useMutation({
    mutationFn: (id) => service.delete(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      if (data.id) {
        queryClient.removeQueries({ queryKey: [queryKey, data.id] });
      }
      options.onDeleteSuccess?.(data);
    },
    onError: (error) => {
      options.onDeleteError?.(error);
    }
  });

  const customAction = useMutation({
    mutationFn: ({ action, id, data }) => service.customAction(action, id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      options.onCustomSuccess?.(data);
    },
    onError: (error) => {
      options.onCustomError?.(error);
    }
  });

  return {
    create,
    update,
    patch,
    delete: remove,
    customAction,

    isLoading: create.isPending || update.isPending || patch.isPending || remove.isPending,
    isError: create.isError || update.isError || patch.isError || remove.isError,
    error: create.error || update.error || patch.error || remove.error
  };
};

export default useEntityMutations;