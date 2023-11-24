import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Transaction } from "../account/transactions/transaction.entity";
import { SplitShare } from "./split.share.entity";

export enum SplitType {
    evenly = "evenly",
    percentage = "percentage",
    amount = "amount",
}

@Entity()
@Unique(['transactionId'])
export class Split {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "uuid" })
    transactionId: string;

    @OneToOne(() => Transaction, { eager: true })
    @JoinColumn({ name: "transactionId" })
    transaction: Transaction;

    @Column({ enum: SplitType })
    type: SplitType;

    @OneToMany(() => SplitShare, splitShare => splitShare.split)
    splitShares: SplitShare[];
}