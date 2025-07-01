import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUserAPI, deleteUserAPI, fetchAllUsersAPI, updateUserAPI } from '@/services/AllAPIs';
import { toast } from 'sonner';

type filters = {
    searchName?: string | null;
    searchEmail?: string | null;
    role?: string | null;
};

//Fetch all users
export const allUsersHook = (filters?: filters) => {
    const UserFilters = {
        searchName: filters?.searchName ?? '',
        searchEmail: filters?.searchEmail ?? '',
        role: filters?.role ?? ''
    };

    return useQuery({
        queryKey: ['userData', UserFilters],
        queryFn: async () => {
      
            const response = await fetchAllUsersAPI(UserFilters);
            return response.data;
        },
        refetchOnWindowFocus: false,
    });
};



//create User
export const useCreateUser = (onSuccessCallback?: ()=>void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {

            const response = await createUserAPI(data)
            return response

        },
        onSuccess: (res) => {
            toast.success(res.data.message)
            console.log(res.data)
            queryClient.invalidateQueries({ queryKey: ["userData"] })
            if (onSuccessCallback) onSuccessCallback();
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to create user")
        }
    })

}


//Update User
export const useUpdateUser = (userId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
            mutationFn: async (data: any) => {
    
                const response = await updateUserAPI(userId,data)
                return response
    
            },
            onSuccess: (res) => {
                toast.success(res.data.message)
                queryClient.invalidateQueries({ queryKey: ["userData"] })
                // console.log(res)
            },
            onError: (err: any) => {
                toast.error(err.response?.data?.message || "Failed to create user")
            }
        })
}



//Delete User
export const useDeleteUser = (userId: number) => {
const queryClient = useQueryClient();
return useMutation({
        mutationFn: async () => {

            const response = await deleteUserAPI(userId)
            return response
        },
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["userData"] })
            // console.log(res)
            toast.success(res.data?.message)
        },
        onError: (data) => {
            console.log(data)
        }
    })

}