export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}


export interface Account {
    id: string;
    type: string;
    balance: number;
    category: "credit" | "debit";
    recentTransactions: Transaction[];
}

export interface Transaction {
    id: string;
    debitAmount: number;
    creditAmount: number;
    description: string;
    category: string;
    bankAccountId: string;
    vendorId: number;
    vendor: Vendor;
    createdAt: string;
}

export interface Vendor {
    id: number;
    name: string;
    logoURL: string;
}

export interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export enum SplitType {
    Evenly = "evenly",
    Percentage = "percentage",
    Amount = "amount",
}

export interface Split {
    id: number;
    type: SplitType;
    splitShares: SplitShare[];
}

export interface SplitShare {
    id: number;
    contactId: string;
    amount: number;
}