import { EntityManager, Repository } from "typeorm";
import { User } from "./user.entity";
import { AppDataSource } from "../data-source";
import { DebitAccountService } from "../account/account.service";
import { AccountType } from "../account/account.entity";
import { getAccountNumber } from "../account/utils";

export class RegistrationService {
    private userRepository: Repository<User>
    private manager: EntityManager;
    constructor(manager?: EntityManager) {
        this.manager = manager || AppDataSource.manager;
        this.userRepository = this.manager.getRepository(User);
    }

    async registerUser(user: Omit<User, "id">) {
        const userExists = await this.userExists(user.email);
        if (userExists) {
            throw new Error('User already exists');
        }
        const newUser = await this.createUser(user);
        return newUser;
    }
    private async userExists(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        return !!user;
    }
    private async createUser(user: Omit<User, "id">): Promise<User> {
        const newUser = await this.userRepository.save(user);

        if(newUser) {
            this.createAccountsForUser(newUser.id);
        }
        return newUser;
    }
    
    private async createAccountsForUser(userId: string) {
        const accountService = new DebitAccountService(this.manager);
        return await Promise.all([
            accountService.createAccount({
                accountHolderId: userId,
                accountType: AccountType.Chequing,
                accountNumber: getAccountNumber(),
            }),            
            accountService.createAccount({
                accountHolderId: userId,
                accountType: AccountType.Savings,
                accountNumber: getAccountNumber(),
            })
        ]);
    }
}