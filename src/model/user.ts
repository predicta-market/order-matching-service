import { Model, DataTypes } from '@sequelize/core';
import { Database } from '../config';
import { IUserAttributes, IUserCreationAttributes } from './types';

const databaseInstance = Database.getInstance().getDatabase();


export class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
    public id!: number;
    public username!: string;
    public phoneNumber!: string;
    public email!: string;
    public password!: string;
    public pin!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, 
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pin: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 6], // Validates that the pin is 4-6 characters long
            },
        },
    },
    {
        sequelize: databaseInstance,
        modelName: 'User', // Name of the model
        tableName: 'users', // Optional: specify table name explicitly
        timestamps: true, // Enable createdAt and updatedAt fields
    }
);
