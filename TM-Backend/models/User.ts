import { Model, DataTypes,Optional } from 'sequelize';
import  sequelize from './index'

export interface userAttributes {
    id: number;  
    username: string;
    email: string;
    password: string;

     role: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export interface userInput extends Optional<userAttributes, | 'id' >{}

export class User extends Model<userAttributes,userInput> implements userAttributes {
    public id!: number;  
    public username!: string;
    public email!: string;
    public password!: string;

    public role!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user' // ✅ default value
}
}, {
    timestamps: true,
    sequelize: sequelize
})