import { Op } from "sequelize";
import { createTaskDTO, taskFilters } from "../dtos/task.dto";
import { Task, TaskAttributes } from "../models/Task";



class TaskServices {
    public async createTask(data: createTaskDTO, userId: number): Promise<TaskAttributes> {

        const task = await Task.create({
            title: data.title,
            description: data.description,
            userId,
            startDate: data.startDate ? new Date(data.startDate) : null,
            endDate: data.endDate ? new Date(data.endDate) : null,
            status: data.status || "planning"
        })
        return task;
    }


    public async fetchAllTasks(filters: taskFilters): Promise<TaskAttributes[]> {
        const where: any = {};

        if (filters.searchTitle) {
            where.title = { [Op.iLike]: `%${filters.searchTitle}%` };
        }

        if (filters.filterStatus) {
            where.status = { [Op.iLike]: `%${filters.filterStatus}%` };
        }

        if (filters.filterStartDate || filters.filterEndDate) {
            where.startDate = {};
            if (filters.filterStartDate) {
                where.startDate[Op.gte] = new Date(filters.filterStartDate);
            }
            if (filters.filterEndDate) {
                where.startDate[Op.lte] = new Date(filters.filterEndDate);
            }
        }


        return await Task.findAll({
            where,
            order: [['createdAt', 'DESC']],
        });
    }

    public async deleteTask(id: number): Promise<void> {
        const user = await Task.findOne({ where: { id } })
        if (!user) {
            throw { status: 404, message: "Task not found" }
        }

        const deleteUser = await Task.destroy({ where: { id } })
    }


    //Update user
    public async updateTask(id: string, data: createTaskDTO): Promise<any> {
        const cleanData = {
            ...data,
            startDate: data.startDate ? new Date(data.startDate) : undefined,
            endDate: data.endDate ? new Date(data.endDate) : undefined,
        };

        const updatedTask = await Task.update(cleanData, {
            where: { id },
            returning: true,
        });

        return updatedTask;
    }


}

export default TaskServices;