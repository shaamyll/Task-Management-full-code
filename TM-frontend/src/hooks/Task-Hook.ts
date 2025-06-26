import { useQuery } from '@tanstack/react-query';
import { getAllTasksAPI } from '@/services/AllAPIs';

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
