import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Split } from "./split.entity";

@Entity()
export class SplitShare {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    splitId: number;

    @ManyToOne(() => Split, { onDelete: "CASCADE" })
    split: Split;

    @Column()
    contactId: string;

    @Column({ type: "double precision" })
    amount: number;
}