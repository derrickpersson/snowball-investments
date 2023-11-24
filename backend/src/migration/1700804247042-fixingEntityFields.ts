import { MigrationInterface, QueryRunner } from "typeorm";

export class FixingEntityFields1700804247042 implements MigrationInterface {
    name = 'FixingEntityFields1700804247042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "split" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "split" ADD "transactionId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "split" ADD CONSTRAINT "UQ_bfe22cb4b12cbab802c252607d7" UNIQUE ("transactionId")`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "UQ_fb613b01b48f8e960af444e6e9f" UNIQUE ("email", "ownerId")`);
        await queryRunner.query(`ALTER TABLE "split" ADD CONSTRAINT "FK_bfe22cb4b12cbab802c252607d7" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "split" DROP CONSTRAINT "FK_bfe22cb4b12cbab802c252607d7"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "UQ_fb613b01b48f8e960af444e6e9f"`);
        await queryRunner.query(`ALTER TABLE "split" DROP CONSTRAINT "UQ_bfe22cb4b12cbab802c252607d7"`);
        await queryRunner.query(`ALTER TABLE "split" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "split" ADD "transactionId" character varying NOT NULL`);
    }

}
