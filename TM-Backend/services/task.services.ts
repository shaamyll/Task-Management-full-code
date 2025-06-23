import { createTaskDTO } from "../dtos/task.dto";
import { Task, TaskAttributes } from "../models/Task";



class TaskServices {    
        public async createTask(data: createTaskDTO,userId:number): Promise<TaskAttributes> {

            const task =  await Task.create({
                title: data.title,
                description: data.description,
                userId
            })
             return task;
        }

        public async fetchAllTasks(): Promise<TaskAttributes[]> {
            return await Task.findAll()
        }
}

export default TaskServices;