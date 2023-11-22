import { DataSource, DataSourceOptions } from "typeorm";
import { databaseConfig } from "../data-source";

export const TestDataSource = new DataSource({
    ...databaseConfig,
    database: "test",
} as DataSourceOptions);

export async function mochaGlobalSetup() {
    this.dataSource = await TestDataSource.initialize();
    await this.dataSource.runMigrations();
}