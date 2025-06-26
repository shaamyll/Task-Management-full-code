import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './index'
import { User } from './User';





export interface TaskAttributes {
    id: number;
    userId: number;
    assignedTo?: number | null; 

    title: string;
    description: string;
    status?: string; // Optional field for task status

    startDate: Date | null;
    endDate: Date | null;

    updatedAt?: Date;
    createdAt?: Date;
}

export interface TaskInput extends Optional<TaskAttributes, | 'id'  >{}



export class Task extends Model<TaskAttributes,TaskInput> implements TaskAttributes {
    public id!: number;
    public userId!: number;
    public assignedTo?: number | null;

    public title!: string;
    public description!: string;
    public status?: string; // Optional field for task status

    public startDate!: Date | null;
    public endDate!: Date | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
     assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'planning' // ✅ new field added
  },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true // Allow null for tasks that don't have a start date
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true // Allow null for tasks that don't have an end date
    },
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true // This will be set in the index file where the Sequelize instance is created
})


User.hasMany(Task , { foreignKey: 'userId' })
Task.belongsTo(User, { foreignKey: 'userId' })


//Assigned to
User.hasMany(Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });
Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });