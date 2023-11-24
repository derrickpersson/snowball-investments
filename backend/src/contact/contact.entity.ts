import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
@Unique(["email", "ownerId"])
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    ownerId: string;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "ownerId" })
    owner: User;
}