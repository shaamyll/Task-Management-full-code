import  socket  from './socket';

export const emitStatusUpdate = (taskId: number, status: string , title:string) => {
  socket.emit('statusUpdate', { taskId, status ,title });
};

export const emitNewComment = (taskId: number, comment: any ) => {
  socket.emit('newComment', { taskId, comment });
};

export const registerUser = (userId: number) => {
  socket.emit('registerUser', userId);
};


export const disconnectSocket = () => {
  socket.disconnect();
};

export const reconnectSocket = () => {
  socket.connect();
};