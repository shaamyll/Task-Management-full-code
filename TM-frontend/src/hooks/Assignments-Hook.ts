import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { assignTaskAPI, fetchAllAssignments, fetchdeveloperTasksAPI, removeAssignmentAPI } from '@/services/AllAPIs';

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



//getAllAssignmrnts
export const fetchAllAssignmentsHook = (filters: any) => {
  return useQuery({
    queryKey: ['taskKey', filters],
    queryFn: async ({ queryKey }) => {
      const [, filters] = queryKey; // destructure filters from queryKey
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const headers = {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetchAllAssignments(filters,headers);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};




//fetch developers Tasks
export const fetchDevelopersTasksHook = (filters: any) => {
  return useQuery({
    queryKey: ['taskKey', filters],
    queryFn: async ({queryKey}) => {
      const [, filters] = queryKey;
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const headers = {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      };

   

      const response = await fetchdeveloperTasksAPI(filters, headers);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

