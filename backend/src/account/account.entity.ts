import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../auth/user.entity';
import { Timestamps } from '../common/timestamps.entity';
import { Transaction } from './transactions/transaction.entity';

export enum AccountType {
    Chequing = "Chequing",
    Savings = "Savings",
    Credit = "Credit",
    TFSA = "TFSA",
    RRSP = "RRSP",
    NonRegistered = "Non-Registered"
}

@Entity()
export class BankAccount extends Timestamps {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    accountNumber: string;

    /**
     * We're an online only branch; so all accounts have the same branch number (06000)
     */
    @Column({ default: "06000" })
    branchNumber: string;

    /**
     * All accounts will belong to the same institution number (090)
     */
    @Column({ default: "090" })
    institutionNumber: string;

    @Column()
    accountHolderId: string;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "accountHolderId" })
    accountHolder: User;

    @Column()
    accountType: AccountType;

    @OneToMany(() => Transaction, transaction => transaction.bankAccount)
    transactions: Transaction[];
}
