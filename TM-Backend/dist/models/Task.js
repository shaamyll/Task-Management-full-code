"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const DB_1 = __importDefault(require("../config/DB"));
const User_1 = require("./User");
class Task extends sequelize_1.Model {
}
exports.Task = Task;
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    assignedTo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id',
        }
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'planning'
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
}, {
    timestamps: true,
    sequelize: DB_1.default,
    paranoid: true
});
User_1.User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User_1.User, { foreignKey: 'userId' });
//Assigned to
User_1.User.hasMany(Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });
Task.belongsTo(User_1.User, { foreignKey: 'assignedTo', as: 'assignee' });
