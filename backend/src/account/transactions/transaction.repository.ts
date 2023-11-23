import BigNumber from "bignumber.js";
import { AppDataSource } from "../../data-source";
import { Transaction } from "./transaction.entity";

export const TransactionRepository = AppDataSource.getRepository(Transaction).extend( {
    sumCreditTransactions: async function(bankAccountId: string): Promise<BigNumber> {
        const sumQuery = await this.createQueryBuilder("transaction")
            .select("SUM(transaction.creditAmount)", "sum")
            .where("transaction.bankAccountId = :bankAccountId", { bankAccountId })
            .getRawOne();
        const sumResult = sumQuery.sum;
        return new BigNumber(sumResult);
    },
    sumDebitTransactions: async function(bankAccountId: string): Promise<BigNumber> {
        const sumQuery = await this.createQueryBuilder("transaction")
            .select("SUM(transaction.debitAmount)", "sum")
            .where("transaction.bankAccountId = :bankAccountId", { bankAccountId })
            .getRawOne();
        const sumResult = sumQuery.sum;
        return new BigNumber(sumResult);
    },

    findRecentTransactions: async function(bankAccountId: string): Promise<Transaction[]> {
        return await this.find({
            where: {
                bankAccountId
            },
            relations: ["vendor"],
            order: {
                createdAt: "DESC"
            },
            limit: 10,
        });
    }
});