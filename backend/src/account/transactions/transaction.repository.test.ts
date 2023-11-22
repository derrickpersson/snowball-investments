import { expect } from "chai";
import { AppDataSource } from "../../data-source";
import { TransactionRepository } from "./transaction.repository";
import { Transaction, TransactionCategory } from "./transaction.entity";
import { TestDataSource } from "../../tests/global";


const makeTxnObj = (amount: number, bankAccountId: string, type: "debit" | "credit") => {
    return {
        bankAccountId,
        vendorName: "test",
        creditAmount: type === "credit" ? amount : 0,
        debitAmount: type === "debit" ? amount : 0,
        category: TransactionCategory.Other,
    };
}

describe("TransactionRepository", () => {
    let bankAccountId: string;
    let seededTransactions: Partial<Transaction>[];

    beforeEach(async () => {
        // TODO: Build factories to generate these entities for tests
        const accountHolder = await TestDataSource.manager.insert("User", {
            email: "test@example.com",
            password: "password",
            firstName: "test",
            lastName: "user"
        });
        const bankAccount = await TestDataSource.manager.insert("BankAccount", {
            accountNumber: "123456789",
            accountHolderId: accountHolder.identifiers[0].id,
            accountType: "Chequing"
        });

        bankAccountId = bankAccount.identifiers[0].id;
        seededTransactions = [
            makeTxnObj(100.10, bankAccountId, "credit"),
            makeTxnObj(200.20, bankAccountId, "credit"),
            makeTxnObj(300, bankAccountId, "credit"),
            makeTxnObj(400.00, bankAccountId, "credit"),
            makeTxnObj(100.1, bankAccountId, "debit"),
            makeTxnObj(200, bankAccountId, "debit"),
            makeTxnObj(300.10, bankAccountId, "debit"),
            makeTxnObj(400, bankAccountId, "debit"),
            makeTxnObj(500, bankAccountId, "debit"),
        ];

        await TestDataSource.manager.insert("Transaction", seededTransactions);
    });

    afterEach(async () => {
        await Promise.all([
            TestDataSource.manager.delete("Transaction", {}),
            TestDataSource.manager.delete("BankAccount", {}),
            TestDataSource.manager.delete("User", {}),
        ]);
    })


    it("should sum credit transactions", async () => {
        const sum = await TestDataSource.manager.withRepository(TransactionRepository).sumCreditTransactions(bankAccountId);
        expect(sum.isEqualTo(1000.30));
    });

    it("should preserve fractional sums", async () => {
        const accountHolder = await TestDataSource.manager.insert("User", {
            email: "test@example.com",
            password: "password",
            firstName: "test",
            lastName: "user"
        });
        const bankAccount = await TestDataSource.manager.insert("BankAccount", {
            accountNumber: "123456789",
            accountHolderId: accountHolder.identifiers[0].id,
            accountType: "Chequing"
        });

        const bankAccountId = bankAccount.identifiers[0].id;
        const seededTransactions = [
            makeTxnObj(0.111111, bankAccountId, "debit"),
            makeTxnObj(0.111111, bankAccountId, "debit"),
            makeTxnObj(0.111111, bankAccountId, "debit"),
        ];

        await TestDataSource.manager.insert("Transaction", seededTransactions);
        const sum = await TestDataSource.manager.withRepository(TransactionRepository).sumDebitTransactions(bankAccountId);
        expect(sum.isEqualTo(0.333333));
    });

    it("should sum debit transactions", async () => {
        const sum = await TestDataSource.manager.withRepository(TransactionRepository).sumDebitTransactions(bankAccountId);
        expect(sum.isEqualTo(1500.20));
    });

    it("should return recent transactions", async () => {
        const transactions = await TestDataSource.manager.withRepository(TransactionRepository).findRecentTransactions(bankAccountId);
        expect(transactions.length).to.equal(seededTransactions.length);
    });
});