import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskMutationKeys } from "../../keys/mutations";
import { taskQueryKeys } from "../../keys/queries";
import { api } from "../../lib/axios";

export const useDeleteTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.deleteAll(),
    mutationFn: async () => {
      // Busca todas as tarefas
      const { data: tasks } = await api.get("/tasks");

      // Deleta cada tarefa
      await Promise.all(
        tasks.map((task) => api.delete(`/tasks/${task.id}`))
      );
      return tasks;
    },
    onSuccess: () => {
      // Limpa o cache de todas as tarefas
      queryClient.setQueryData(taskQueryKeys.getAll(), []);
    },
  });
};
