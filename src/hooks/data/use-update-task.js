import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../../lib/axios";

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data) => {
      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      });

      return updatedTask;
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData("tasks", (currentTasks) => {
        return currentTasks.map((currentTask) => {
          if (currentTask.id === taskId) {
            return updatedTask;
          }
          return currentTask;
        });
      });
    },
  });
};
