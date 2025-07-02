"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Task_1 = require("../models/Task");
const User_1 = require("../models/User");
const Comment_1 = require("../models/Comment");
class TaskServices {
    createTask(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield Task_1.Task.create({
                title: data.title,
                description: data.description,
                userId,
                startDate: data.startDate ? new Date(data.startDate) : null,
                endDate: data.endDate ? new Date(data.endDate) : null,
                status: data.status || "planning"
            });
            return task;
        });
    }
    fetchAllTasks(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {};
            if (filters.searchTitle) {
                where.title = { [sequelize_1.Op.iLike]: `%${filters.searchTitle}%` };
            }
            if (filters.filterStatus) {
                where.status = { [sequelize_1.Op.iLike]: `%${filters.filterStatus}%` };
            }
            if (filters.filterStartDate || filters.filterEndDate) {
                where.startDate = {};
                if (filters.filterStartDate) {
                    where.startDate[sequelize_1.Op.gte] = new Date(filters.filterStartDate);
                }
                if (filters.filterEndDate) {
                    where.startDate[sequelize_1.Op.lte] = new Date(filters.filterEndDate);
                }
            }
            return yield Task_1.Task.findAll({
                where,
                order: [['createdAt', 'DESC']],
            });
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Task_1.Task.findOne({ where: { id } });
            if (!user) {
                throw { status: 404, message: "Task not found" };
            }
            const deleteUser = yield Task_1.Task.destroy({ where: { id } });
        });
    }
    //Update user
    updateTask(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanData = Object.assign(Object.assign({}, data), { startDate: data.startDate ? new Date(data.startDate) : undefined, endDate: data.endDate ? new Date(data.endDate) : undefined });
            const updatedTask = yield Task_1.Task.update(cleanData, {
                where: { id },
                returning: true,
            });
            return updatedTask;
        });
    }
    //Assigned to
    assignTask(taskId, assignedTo) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if task exists
            const task = yield Task_1.Task.findByPk(taskId);
            if (!task) {
                throw { status: 404, message: "Task not found" };
            }
            const user = yield User_1.User.findByPk(assignedTo);
            if (!user)
                throw { status: 404, message: "Assigned user does not exist" };
            // Update the assignedTo field
            task.assignedTo = assignedTo;
            yield task.save();
            return task;
        });
    }
    //Remove Assigment
    removeAssignment(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield Task_1.Task.findByPk(taskId);
            if (!task) {
                throw { status: 404, message: "Task not found" };
            }
            task.assignedTo = null;
            yield task.save();
            return task;
        });
    }
    //Assigned Tasks
    getAssignedTasks(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                assignedTo: {
                    [sequelize_1.Op.not]: null,
                } // filter by assigned developer
            };
            if (filters.searchTitle) {
                where.title = { [sequelize_1.Op.iLike]: `%${filters.searchTitle}%` };
            }
            if (filters.filterStatus) {
                where.status = { [sequelize_1.Op.iLike]: `%${filters.filterStatus}%` };
            }
            const tasks = yield Task_1.Task.findAll({
                where,
                include: [
                    {
                        model: User_1.User,
                        as: 'assignee',
                        attributes: ['id', 'username', 'email', 'role'], // user info
                    },
                    {
                        model: Comment_1.Comment,
                        attributes: ['id', 'content', 'taskId', 'userId', 'createdAt'],
                        include: [
                            {
                                model: User_1.User,
                                attributes: ['id', 'username'],
                            },
                        ],
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
            return tasks;
        });
    }
    //get developer Tasks
    getDevelopersTasks(userId, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {
                assignedTo: userId, // filter by assigned developer
            };
            if (filters.searchTitle) {
                where.title = { [sequelize_1.Op.iLike]: `%${filters.searchTitle}%` };
            }
            if (filters.filterStatus) {
                where.status = { [sequelize_1.Op.iLike]: `%${filters.filterStatus}%` };
            }
            const tasks = yield Task_1.Task.findAll({
                where,
                include: [
                    {
                        model: Comment_1.Comment,
                        attributes: ['id', 'content', 'taskId', 'userId', 'createdAt'],
                        include: [
                            {
                                model: User_1.User,
                                attributes: ['id', 'username'],
                            },
                        ],
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
            return tasks;
        });
    }
}
exports.default = TaskServices;
