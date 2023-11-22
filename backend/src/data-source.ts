import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"

export const databaseConfig: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: false,
    logging: false,
    entities: ["**/*.entity.ts"],
    migrations: ["./src/migration/*.ts"],
    subscribers: [],
}

export const AppDataSource = new DataSource(databaseConfig);
