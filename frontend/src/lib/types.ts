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