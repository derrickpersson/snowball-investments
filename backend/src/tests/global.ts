import { AppDataSource } from "../data-source";

export async function mochaGlobalSetup() {
    this.dataSource = await AppDataSource.initialize()
}