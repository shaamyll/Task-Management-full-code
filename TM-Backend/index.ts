import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import sequelize from './models';
import AuthRoutes from './routes/auth.routes';
import TaskRoutes from './routes/task.routes';
import CommentRoutes from './routes/comment.routes';
import { createSocketServer } from './socket/socket';

const TMserver = express();

TMserver.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
TMserver.use(express.json());
TMserver.use(express.urlencoded({ extended: true }));

const routes = [new AuthRoutes(), new TaskRoutes(), new CommentRoutes()];
routes.forEach(route => TMserver.use('/api', route.router));

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(async () => {
  await sequelize.sync();

  const httpServer = createSocketServer(TMserver); // Socket starts AFTER Express is ready

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});