import { EntityManager, Repository } from 'typeorm';
import { BankAccount } from './account.entity';
import { TransactionRepository } from "./transactions/transaction.repository";
import BigNumber from "bignumber.js";
import { AppDataSource } from '../data-source';

export class AccountService {
    private bankAccountRepository: Repository<BankAccount>;
    private transactionRepository: typeof TransactionRepository;
    constructor(
        manager?: EntityManager
    ) {
        this.transactionRepository = (manager || AppDataSource.manager).withRepository(TransactionRepository);
        this.bankAccountRepository = (manager || AppDataSource.manager).getRepository(BankAccount);
    }

    async getBalance(accountId: string): Promise<number> {
        const debitSum = await this.transactionRepository.sumDebitTransactions(accountId);
        const creditSum = await this.transactionRepository.sumCreditTransactions(accountId);
        const debitBigNumber = new BigNumber(debitSum.sum || 0);
        const creditBigNumber = new BigNumber(creditSum.sum || 0);
        const balance =  debitBigNumber.minus(creditBigNumber).toNumber();
        return balance;
    }
}
