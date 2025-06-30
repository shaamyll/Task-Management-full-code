import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from './DB'
import { User } from './User';
import { Comment } from './Comment';




export interface TaskAttributes {
    id: number;
    userId: number;
    assignedTo?: number | null; 

    title: string;
    description: string;
    status?: string; 

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
    public status?: string; 

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
    defaultValue: 'planning' 
  },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true 
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true 
    },
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true 
})


User.hasMany(Task , { foreignKey: 'userId' })
Task.belongsTo(User, { foreignKey: 'userId' })


//Assigned to
User.hasMany(Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });
Task.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignee' });

