import { GenericRepository } from '@core/GenericRepository';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useRepository<T, C, P extends Record<string, any>>(repository: GenericRepository<T, C, P>) {
  const queryClient = useQueryClient();

  const getAll = (params?: P) =>
    useQuery({
      queryKey: [repository.base, params],
      queryFn: () => repository.getAll(params),
    });

  const getById = (id: number) =>
    useQuery({
      queryKey: [repository.base, id],
      queryFn: () => repository.getById(id),
      enabled: !!id,
    });

  const create = useMutation({
    mutationFn: (data: C) => repository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [repository.base] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: C }) => repository.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [repository.base] });
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) => repository.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [repository.base] });
    },
  });

  return { getAll, getById, create, update, remove };
}
