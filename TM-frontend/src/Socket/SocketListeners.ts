import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import socket from '@/Socket/socket';

const useTaskRealtimeListeners = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        //status
        const handleStatusUpdate = ({ taskId, status, title }: { taskId: number; status: string; title: string }) => {
            console.log('Status update received:', taskId, status, title);
            queryClient.invalidateQueries({ queryKey: ['taskKey'] });
        };

        //commment
        const handleNewComment = ({ taskId, comment }: { taskId: number; comment: any }) => {
            console.log(' New comment received:', comment, 'on task:', taskId);
            queryClient.invalidateQueries({ queryKey: ['taskKey'] });
        };


        const handleCommentNotification = ({
            taskId,
            comment,
            message,
        }: {
            taskId: number;
            comment: any;
            message: string;
        }) => {
            console.log('Comment notification received:', message, taskId, comment);
        };

        socket.on('receiveStatusUpdate', handleStatusUpdate);
        socket.on('receiveCommentUpdate', handleNewComment);
        socket.on('receiveCommentNotification', handleCommentNotification);

        socket.on('commentDeleted', ({ commentId, taskId }) => {
            console.log('Comment deleted:', commentId,taskId);
            queryClient.invalidateQueries({ queryKey: ['taskKey'] }); // Refetch task/comments
        });


        return () => {
            socket.off('receiveStatusUpdate', handleStatusUpdate);
            socket.off('receiveCommentUpdate', handleNewComment);
            socket.off('receiveCommentNotification', handleCommentNotification);
        };
    }, [queryClient]);
};

export default useTaskRealtimeListeners;