import BigNumber from "bignumber.js";
import { BankAccount } from "./account.entity";
import { TransactionRepresentation } from "./transactions/types";

export interface IBankAccountService {
    getBalance(accountId: string): Promise<BigNumber>;
    getRepresentation(accountId: string): Promise<AccountRepresentation>;
}

export interface AccountListItemRepresentation extends BankAccount{
}


export interface AccountRepresentation extends BankAccount {
    id: string;
    accountNumber: string;
    branchNumber: string;
    institutionNumber: string;
    accountHolderId: string;
    balance: number;
    recentTransactions: TransactionRepresentation[];
}