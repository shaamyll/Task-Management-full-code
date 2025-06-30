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

    // Register user to rooms
    socket.on('registerUser', (userId) => {
      socket.join(`user-${userId}`);
      socket.join('global-status-room');
    });

    // Handle new comment
    
    socket.on('newComment', async ({ taskId, comment }) => {
      io.to(`task-${taskId}`).emit('receiveComment', comment);

      const task = await Task.findByPk(taskId, { attributes: ['title'] });
      const message = task && `New comment "${comment.content}" on task ${task.title}`
 

      io.to('global-status-room').emit('receiveCommentNotification', { message });
    });

    // Handle status update
    socket.on('statusUpdate', ({ taskId, status }) => {
      io.to('global-status-room').emit('receiveStatusUpdate', {
        taskId,
        status,
        message: `Task #${taskId} is "${status}"`,
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return httpServer;
};

export { io };