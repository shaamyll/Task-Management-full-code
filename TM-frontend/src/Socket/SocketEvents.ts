import  socket  from './socket';

export const emitStatusUpdate = (taskId: number, status: string) => {
  socket.emit('statusUpdate', { taskId, status });
};

export const emitNewComment = (taskId: number, comment: any) => {
  socket.emit('newComment', { taskId, comment });
};

export const registerUser = (userId: number) => {
  socket.emit('registerUser', userId);
};