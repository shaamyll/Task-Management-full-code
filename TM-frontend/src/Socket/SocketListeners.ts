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

        socket.on('receiveStatusUpdate', handleStatusUpdate);
        socket.on('receiveComment', handleNewComment);

        return () => {
            socket.off('receiveStatusUpdate', handleStatusUpdate);
            socket.off('receiveComment', handleNewComment);
        };
    }, [queryClient]);
};

export default useTaskRealtimeListeners;