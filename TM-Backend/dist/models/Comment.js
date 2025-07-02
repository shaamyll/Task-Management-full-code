"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const sequelize_1 = require("sequelize");
const DB_1 = __importDefault(require("../config/DB"));
const Task_1 = require("./Task");
const User_1 = require("./User");
class Comment extends sequelize_1.Model {
}
exports.Comment = Comment;
Comment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    taskId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tasks',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    sequelize: DB_1.default,
    modelName: 'comment',
    tableName: 'comments',
    timestamps: true,
    underscored: true,
});
Task_1.Task.hasMany(Comment, { foreignKey: 'taskId' });
Comment.belongsTo(Task_1.Task, { foreignKey: 'taskId' });
User_1.User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User_1.User, { foreignKey: 'userId' });
