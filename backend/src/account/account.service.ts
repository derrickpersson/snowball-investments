import { EntityManager, Repository } from 'typeorm';
import { BankAccount } from './account.entity';
import { TransactionRepository } from "./transactions/transaction.repository";
import BigNumber from "bignumber.js";
import { AppDataSource } from '../data-source';
import { IBankAccountService } from './types';

export class DebitAccountService implements IBankAccountService {
    private bankAccountRepository: Repository<BankAccount>;
    private transactionRepository: typeof TransactionRepository;
    constructor(
        manager?: EntityManager
    ) {
        this.transactionRepository = (manager || AppDataSource.manager).withRepository(TransactionRepository);
        this.bankAccountRepository = (manager || AppDataSource.manager).getRepository(BankAccount);
    }

    async getBalance(accountId: string): Promise<BigNumber> {
        const debitSum = await this.transactionRepository.sumDebitTransactions(accountId);
        const creditSum = await this.transactionRepository.sumCreditTransactions(accountId);
        const balance = debitSum.minus(creditSum);
        return balance;
    }

    async getRepresentation(accountId: string) {
        const bankAccount = await this.bankAccountRepository.findOneBy({ id: accountId });
        const balance = await this.getBalance(accountId);
        const recentTransactions = await this.transactionRepository.findRecentTransactions(accountId);
        return {
            ...bankAccount,
            balance: balance.toNumber() || 0,
            recentTransactions
        };
    }
}
