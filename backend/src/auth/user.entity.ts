import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    email: string;

    /**
     * Storing the password in plain text is a very, very bad idea.
     * This is dummy auth implementation and not suitable for the real world.
     */
    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}
