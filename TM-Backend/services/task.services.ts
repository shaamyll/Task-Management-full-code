import { Op } from "sequelize";
import { createTaskDTO, taskFilters } from "../dtos/task.dto";
import { Task, TaskAttributes } from "../models/Task";
import { User } from "../models/User";



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


    //Assigned to
    public async assignTask(taskId: number, assignedTo: number): Promise<TaskAttributes> {
        // Check if task exists
        const task = await Task.findByPk(taskId);
        if (!task) {
            throw { status: 404, message: "Task not found" };
        }

        const user = await User.findByPk(assignedTo);
        if (!user) throw { status: 404, message: "Assigned user does not exist" };


        // Update the assignedTo field
        task.assignedTo = assignedTo;
        await task.save();

        return task;
    }


    //Remove Assigment
    public async removeAssignment(taskId: number): Promise<TaskAttributes> {
    const task = await Task.findByPk(taskId);

    if (!task) {
        throw { status: 404, message: "Task not found" };
    }

    task.assignedTo = null;
    await task.save();

    return task;
}


//Developer Tasks

}

export default TaskServices;