import { MigrationInterface, QueryRunner } from 'typeorm';

export class NoDecimals1687108685222 implements MigrationInterface {
  name = 'NoDecimals1687108685222';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" DROP COLUMN "price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ADD "price" integer default 0 NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" DROP COLUMN "raised"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ADD "raised" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."offer" DROP COLUMN "amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."offer" ADD "amount" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."offer" DROP COLUMN "amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."offer" ADD "amount" numeric NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" DROP COLUMN "raised"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ADD "raised" numeric NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" DROP COLUMN "price"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ADD "price" numeric NOT NULL`,
    );
  }
}
