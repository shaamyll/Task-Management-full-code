import { Server } from 'socket.io';
import http from 'http';
import { Express } from 'express';

let io: Server;

export const createSocketServer = (app: Express) => {
  const httpServer = http.createServer(app);

  io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinTaskRoom', (taskId) => {
      socket.join(`task-${taskId}`);
    });

    socket.on('registerUser', (userId) => {
      socket.join(`user-${userId}`);
    });

    socket.on('newComment', ({ taskId, comment }) => {
      io.to(`task-${taskId}`).emit('receiveComment', comment);
    });

    socket.on('statusUpdate', ({ taskId, status }) => {
      io.to(`task-${taskId}`).emit('receiveStatusUpdate', status);
    });

    socket.on('sendNotification', ({ userId, message }) => {
      io.to(`user-${userId}`).emit('notification', { message });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    
  });

  return httpServer;
};

export { io };