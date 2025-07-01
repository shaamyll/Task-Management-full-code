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


    //  new comment
    socket.on('newComment', async ({ taskId, comment }) => {
      io.to(`task-${taskId}`).emit('receiveComment', {taskId,comment});

      const task = await Task.findByPk(taskId, { attributes: ['title'] });
      const message = task && `New comment "${comment.content}" on task ${task.title}`
 
      io.to('global-status-room').emit('receiveCommentNotification', { taskId,comment,message });
    });


    // 
    //  status update
    socket.on('statusUpdate', ({ taskId, status,title }) => {
      io.to('global-status-room').emit('receiveStatusUpdate', {
        taskId,
        status,
        title,
        message: `Task #${title} is "${status}"`,
      });
    });


    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return httpServer;
};

export { io };