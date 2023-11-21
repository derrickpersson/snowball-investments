import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingBaseDomainEntities1700602184174 implements MigrationInterface {
    name = 'AddingBaseDomainEntities1700602184174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "debitAmount" double precision NOT NULL DEFAULT '0', "creditAmount" double precision NOT NULL DEFAULT '0', "description" character varying, "category" character varying NOT NULL, "bankAccountId" uuid NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank_account" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountNumber" character varying NOT NULL, "branchNumber" character varying NOT NULL DEFAULT '06000', "institutionNumber" character varying NOT NULL DEFAULT '090', "accountHolderId" uuid NOT NULL, "accountType" character varying NOT NULL, CONSTRAINT "PK_f3246deb6b79123482c6adb9745" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_07540dda5970c29494e0f70f89e" FOREIGN KEY ("bankAccountId") REFERENCES "bank_account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bank_account" ADD CONSTRAINT "FK_dea0100374cdbdf08397241c966" FOREIGN KEY ("accountHolderId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_account" DROP CONSTRAINT "FK_dea0100374cdbdf08397241c966"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_07540dda5970c29494e0f70f89e"`);
        await queryRunner.query(`DROP TABLE "bank_account"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
