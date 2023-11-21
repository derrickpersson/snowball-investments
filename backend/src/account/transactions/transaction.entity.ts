import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Timestamps } from "../../common/timestamps.entity";
import { BankAccount } from "../account.entity";

export enum TransactionCategory {
    Dining = "dining",
    Groceries = "groceries",
    Shopping = "shopping",
    Travel = "travel",
    Other = "other",
}

@Entity()
export class Transaction extends Timestamps {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ default: 0 })
    debitAmount: number;

    @Column({ default: 0 })
    creditAmount: number;

    @Column()
    description: string;

    @Column({ enum: TransactionCategory })
    category: TransactionCategory;

    @Column()
    bankAccountId: string;

    @Column()
    @ManyToOne(() => BankAccount, { onDelete: "CASCADE" })
    @JoinColumn({ name: "bankAccountId" })
    bankAccount: BankAccount;
}
