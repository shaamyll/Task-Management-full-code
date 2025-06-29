import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllTasksAPI, updateTaskAPI } from '@/services/AllAPIs';
import { toast } from 'sonner';

type TaskFilters = {
  searchTitle?: string | null;
  filterStatus?: string | null;
  filterStartDate?: string | null;
  filterEndDate?: string | null;
};

export const allTaskHook = (filters?: TaskFilters) => {
  const finalFilters = {
    searchTitle: filters?.searchTitle ?? '',
    filterStatus: filters?.filterStatus ?? '',
    filterStartDate: filters?.filterStartDate ?? '',
    filterEndDate: filters?.filterEndDate ?? '',
  };

  return useQuery({
    queryKey: ['taskKey', finalFilters],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const header = {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      };

      const response = await getAllTasksAPI(finalFilters, header);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};





//Update task hook
type UpdateTaskOptions = {
  taskId: number
  onSuccess?: () => void
}

export const useUpdateTask = ({ taskId, onSuccess }: UpdateTaskOptions) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token missing")

      const headers = {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      }

      const body = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
        endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
      }

      const response = await updateTaskAPI(taskId, body, headers)
      return response
    },

    onSuccess: (res) => {
      toast.success(res.data.message)
      queryClient.invalidateQueries({ queryKey: ["taskKey"] })
      onSuccess?.()
    }
  })

  return mutation
}