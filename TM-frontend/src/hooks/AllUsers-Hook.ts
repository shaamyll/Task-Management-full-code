import { useQuery } from '@tanstack/react-query';
import { fetchAllUsersAPI } from '@/services/AllAPIs';

type filters = {
    searchName?: string | null;
    searchEmail?: string | null;
    role?: string | null;
};

export const allUsersHook = (filters?: filters) => {
    const UserFilters = {
        searchName: filters?.searchName ?? '',
        searchEmail: filters?.searchEmail ?? '',
        role: filters?.role ?? ''
    };

    return useQuery({
        queryKey: ['userData', UserFilters],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const header = {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            };

            const response = await fetchAllUsersAPI(UserFilters, header);
            return response.data;
        },
        refetchOnWindowFocus: false,
    });
};
