import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "addTask",
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error();
      }
      const createdTask = await response.json();
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData("tasks", (currentTasks) => {
        return [...currentTasks, createdTask];
      });
    },
  });
};
