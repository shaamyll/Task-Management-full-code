// hooks/useAddComment.ts
import { addCommentAPI, deleteCommentAPI } from "@/services/AllAPIs"
import { emitNewComment } from "@/Socket/SocketEvents"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"



export const useAddComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ taskId, content }: { taskId: number; content: string }) => {

            await new Promise(resolve => setTimeout(resolve, 500))


            const token = localStorage.getItem('token')
            if (!token) {
                throw new Error('No token found')
            }

            const headers = {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            }

            const response = await addCommentAPI(taskId, content, headers)
            return response.data
        },

        onSuccess: (data, variables) => {
            console.log(data)
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["taskKey"] });
            emitNewComment(variables.taskId, data.comment);
        },

        onError: (error) => {
            console.error("Failed to add comment:", error)
        },
    })
}



export const useDeleteComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ commentId }: { commentId: number }) => {
            await new Promise(resolve => setTimeout(resolve, 500))
            const token = localStorage.getItem('token')
            if (!token) ("No token found")
            const headers = {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            }
            const response = await deleteCommentAPI(commentId, headers)
            return response.data
        },
        onSuccess: (res) => {
            toast.success(res.message)
            console.log(res)
            queryClient.invalidateQueries({ queryKey: ["taskKey"] })
        },
        onError: (err) => {
            console.error("Failed to delete comment:", err)
        },
    })
}