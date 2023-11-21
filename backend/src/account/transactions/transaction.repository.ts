import { AppDataSource } from "../../data-source";
import { Transaction } from "./transaction.entity";

export const TransactionRepository = AppDataSource.getRepository(Transaction).extend( {
    sumCreditTransactions: async function(bankAccountId: string): Promise<{ sum: number }> {
        const sum = await this.createQueryBuilder("transaction")
            .select("SUM(transaction.creditAmount)", "sum")
            .where("transaction.bankAccountId = :bankAccountId", { bankAccountId })
            .getRawOne();
        return sum;
    },
    sumDebitTransactions: async function(bankAccountId: string): Promise<{ sum: number }> {
        const sum = await this.createQueryBuilder("transaction")
            .select("SUM(transaction.debitAmount)", "sum")
            .where("transaction.bankAccountId = :bankAccountId", { bankAccountId })
            .getRawOne();
        return sum;
    }
});