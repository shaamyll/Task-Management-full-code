import { Server } from 'socket.io';
import http from 'http';
import { Express } from 'express';
import { Task } from '../models/Task';

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
      socket.join('global-status-room'); //room
    });

    //Comment
    socket.on('newComment', async({ taskId, comment }) => {
      io.to(`task-${taskId}`).emit('receiveComment', comment);

      // Fetch task title
      const title = await Task.findByPk(taskId, { attributes: ['title'] });


      const message = `New comment "${comment.content}" on Task #${title}`;
      io.to('global-status-room').emit('receiveCommentNotification', { message });
    });

    socket.on('statusUpdate', ({ taskId, status }) => {
      io.to('global-status-room').emit('receiveStatusUpdate', {
        taskId,
        status,
        message: `Task #${taskId} is  "${status}"`
      });
    });

    socket.off('sendNotification', ({ userId, message }) => {
      io.to(`user-${userId}`).emit('notification', { message });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });


  });

  return httpServer;
};

export { io };