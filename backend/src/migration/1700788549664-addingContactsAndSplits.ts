import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingContactsAndSplits1700788549664 implements MigrationInterface {
    name = 'AddingContactsAndSplits1700788549664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "ownerId" uuid NOT NULL, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "split_share" ("id" SERIAL NOT NULL, "splitId" integer NOT NULL, "contactId" character varying NOT NULL, "amount" double precision NOT NULL, CONSTRAINT "PK_ec38ba72d62a2c33e173655fb65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "split" ("id" SERIAL NOT NULL, "transactionId" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_a656ea46749d1567ca7e7d5923a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_68cfe567915dcb767204eba5895" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "split_share" ADD CONSTRAINT "FK_d5179cde8db40d72f5d673f9cb0" FOREIGN KEY ("splitId") REFERENCES "split"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "split_share" DROP CONSTRAINT "FK_d5179cde8db40d72f5d673f9cb0"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_68cfe567915dcb767204eba5895"`);
        await queryRunner.query(`DROP TABLE "split"`);
        await queryRunner.query(`DROP TABLE "split_share"`);
        await queryRunner.query(`DROP TABLE "contact"`);
    }

}
