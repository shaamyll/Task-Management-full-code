import express from 'express';
import AuthRoutes from './routes/auth.routes';
import sequelize from './models';
import TaskRoutes from './routes/task.routes';
import cors from 'cors';

const TMserver = express();

// Use it before defining routes
TMserver.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

TMserver.use(express.json());
TMserver.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;


const routes = [new AuthRoutes(),new TaskRoutes()];

routes.forEach((route) => TMserver.use('/api', route.router));


sequelize.authenticate().then(async() => {
    await sequelize.sync()
    TMserver.listen(PORT, () =>  console.log(`Server is running on port ${PORT}`))
    
})

