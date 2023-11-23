import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingVendors1700758330653 implements MigrationInterface {
    name = 'AddingVendors1700758330653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "vendorName" TO "vendorId"`);
        await queryRunner.query(`CREATE TABLE "vendor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "logoURL" character varying NOT NULL, CONSTRAINT "UQ_f61018bdc439c6d1a941261b671" UNIQUE ("name"), CONSTRAINT "PK_931a23f6231a57604f5a0e32780" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "vendorId"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "vendorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_account" ADD CONSTRAINT "UQ_0d65403190dfac7941ae649aefc" UNIQUE ("accountNumber", "branchNumber", "institutionNumber")`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_c739b846be36480210f5885e774" FOREIGN KEY ("vendorId") REFERENCES "vendor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_c739b846be36480210f5885e774"`);
        await queryRunner.query(`ALTER TABLE "bank_account" DROP CONSTRAINT "UQ_0d65403190dfac7941ae649aefc"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "vendorId"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "vendorId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "vendor"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "vendorId" TO "vendorName"`);
    }

}
