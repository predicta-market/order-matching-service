import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

import { config } from '../server-config';
import Logger from '../logger';

export class Database {
    // Singleton instance
    private static instance: Database; 
    private database: Sequelize;

    private constructor() {
        const db = config.database.name;
        const user = config.database.user;
        const password = config.database.password;
        const host = config.database.host;
        const port = config.database.port;
        const dbDialect = PostgresDialect;

        this.database = new Sequelize({
            host,
            dialect: dbDialect,
            database: db,
            user: user,
            password,
            port,
            ssl: true,
        });

        this.database.authenticate()
            .then(() => {
                Logger.info('Connection has been established successfully.');
            })
            .catch(err => {
                Logger.error('Unable to connect to the database:', err);
            });

        this.database.sync({
            // Using 'force' will drop any table defined in the models and create them again.
            // force: true
            alter:true
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public getDatabase(): Sequelize {
        return this.database;
    }
}