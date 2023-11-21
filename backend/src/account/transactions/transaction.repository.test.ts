import { expect } from "chai";
import { AppDataSource } from "../../data-source";
import { TransactionRepository } from "./transaction.repository";
import { TransactionCategory } from "./transaction.entity";

describe("TransactionRepository", () => {
    let bankAccountId: string;

    beforeEach(async () => {
        // TODO: Build factories to generate these entities for tests
        const accountHolder = await AppDataSource.manager.insert("User", {
            email: "test@example.com",
            password: "password",
            firstName: "test",
            lastName: "user"
        });
        const bankAccount = await AppDataSource.manager.insert("BankAccount", {
            accountNumber: "123456789",
            accountHolderId: accountHolder.identifiers[0].id,
            accountType: "Chequing"
        });

        bankAccountId = bankAccount.identifiers[0].id;
        const seededTransactions = [
            {
                bankAccountId,
                creditAmount: 100.10,
                debitAmount: 0,
                category: TransactionCategory.Other,
            },
            {
                bankAccountId,
                creditAmount: 200.10,
                debitAmount: 0,
                category: TransactionCategory.Other,
            },
            {
                bankAccountId,
                creditAmount: 300,
                debitAmount: 0,
                category: TransactionCategory.Other,
            },
            {
                bankAccountId,
                creditAmount: 400,
                debitAmount: 0,
                category: TransactionCategory.Other,
            },
            {
                bankAccountId,
                creditAmount: 0,
                debitAmount: 100.1,
                category: TransactionCategory.Other,
            },
            {
                bankAccountId,
                creditAmount: 0,
                debitAmount: 200,
                category: TransactionCategory.Other,
            },
            {
                bankAccountId,
                creditAmount: 0,
                debitAmount: 300.10,
                category: TransactionCategory.Other,
            },
            {
                bankAccountId,
                creditAmount: 0,
                debitAmount: 400,
                category: TransactionCategory.Other,
            },
            {
                bankAccountId,
                creditAmount: 0,
                debitAmount: 500,
                category: TransactionCategory.Other,
            },
        ];

        await AppDataSource.manager.insert("Transaction", seededTransactions);
    })


    it("should sum credit transactions", async () => {
        const sum = await AppDataSource.manager.withRepository(TransactionRepository).sumCreditTransactions(bankAccountId);
        expect(sum.isEqualTo(1000.20));
    });

    it("should preserve fractional sums", async () => {
        const accountHolder = await AppDataSource.manager.insert("User", {
            email: "test@example.com",
            password: "password",
            firstName: "test",
            lastName: "user"
        });
        const bankAccount = await AppDataSource.manager.insert("BankAccount", {
            accountNumber: "123456789",
            accountHolderId: accountHolder.identifiers[0].id,
            accountType: "Chequing"
        });

        const bankAccountId = bankAccount.identifiers[0].id;
        const seededTransactions = [
            {
                bankAccountId,
                creditAmount: 0,
                debitAmount: 0.111111,
                category: TransactionCategory.Other,
            },
            {
                bankAccountId,
                creditAmount: 0,
                debitAmount: 0.111111,
                category: TransactionCategory.Other,
            },
        ];

        await AppDataSource.manager.insert("Transaction", seededTransactions);
        const sum = await AppDataSource.manager.withRepository(TransactionRepository).sumDebitTransactions(bankAccountId);
        expect(sum.isEqualTo(0.222222));
    });

    it("should sum debit transactions", async () => {
        const sum = await AppDataSource.manager.withRepository(TransactionRepository).sumDebitTransactions(bankAccountId);
        expect(sum.isEqualTo(1500.20));
    });
});