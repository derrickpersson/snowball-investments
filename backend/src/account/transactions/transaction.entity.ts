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
    id: string;

    @Column()
    vendorName: string;

    @Column({ default: 0, type: "double precision" })
    debitAmount: number;

    @Column({ default: 0, type: "double precision" })
    creditAmount: number;

    @Column({ nullable: true })
    description: string;

    @Column({ enum: TransactionCategory })
    category: TransactionCategory;

    @Column()
    bankAccountId: string;

    @ManyToOne(() => BankAccount, { onDelete: "CASCADE" })
    @JoinColumn({ name: "bankAccountId" })
    bankAccount: BankAccount;
}
