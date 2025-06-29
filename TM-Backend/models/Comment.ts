import { Model, DataTypes } from 'sequelize';
import sequelize  from './index';
import { Task } from './Task';
import { User } from './User';

export interface CommentAttributes {
  id?: number;
  content: string;
  taskId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public id!: number;
  public content!: string;
  public taskId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tasks',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'comment',
    tableName: 'comments',
    timestamps: true,
    underscored: true,
  }
);


Task.hasMany(Comment, { foreignKey: 'taskId' });
Comment.belongsTo(Task, { foreignKey: 'taskId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

