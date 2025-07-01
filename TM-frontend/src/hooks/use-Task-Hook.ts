import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTaskAPI, deleteTaskAPI, getAllTasksAPI, updateTaskAPI } from '@/services/AllAPIs';
import { toast } from 'sonner';


//Fetch all Tasks
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

      const response = await getAllTasksAPI(finalFilters);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};




//Create task hook

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: any) => {

      const payload = {
        ...body,
        startDate: body.startDate?.toISOString(),
        endDate: body.endDate?.toISOString() || null,
        status: body.status
      };

      const response = await createTaskAPI(payload);
      return response;
    },
    onSuccess: (res) => {
       toast.success(res.data.message)
      queryClient.invalidateQueries({ queryKey: ["taskKey"] });
    },
    onError: (err: any) => {
      console.error(err.response);
    }
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

      const body = {
        ...data,
        startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
        endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
      }

      const response = await updateTaskAPI(taskId, body)
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


//Delete task hook
export const useDeleteTask = (taskId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
          mutationFn: async () => {
              const response = await deleteTaskAPI(taskId )
              return response
          },
          onSuccess: (res: any) => {
              queryClient.invalidateQueries({ queryKey: ["taskKey"] })  //State management of tasks bwtween components
              console.log(res)
               toast.success(res.data?.message)   
          },
          onError: (data) => {
              console.log(data)
          }
      })
}