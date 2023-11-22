import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingAdditionalFieldsForAccountAndTxns1700609786428 implements MigrationInterface {
    name = 'AddingAdditionalFieldsForAccountAndTxns1700609786428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "vendorName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_account" ADD "accountCategory" character varying NOT NULL DEFAULT 'debit'`);
        await queryRunner.query(`ALTER TABLE "bank_account" ALTER COLUMN "accountType" SET DEFAULT 'chequing'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_account" ALTER COLUMN "accountType" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bank_account" DROP COLUMN "accountCategory"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "vendorName"`);
    }

}
