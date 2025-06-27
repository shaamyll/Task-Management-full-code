import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assignTaskAPI, removeAssignmentAPI } from '@/services/AllAPIs';

type AssignPayload = {
  taskId: number;
  userId: number;
};

export const useAssignTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, userId }: AssignPayload) => {
        await new Promise((resolve) => setTimeout(resolve, 700)); 
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const headers = {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      };

      const response = await assignTaskAPI(taskId, userId, headers);
      return response.data;
    },

    onSuccess: (data) => {
        console.log(data)
      queryClient.invalidateQueries({ queryKey: ['taskKey'] });
    },

  });
};






export const useRemoveAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId }: { taskId: number }) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const headers = {
        Authorization: `${token}`,
        "Content-Type": "application/json"
      };

      const response = await removeAssignmentAPI(taskId, headers);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ["taskKey"] });
    },
  });
};





