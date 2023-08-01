import { MigrationInterface, QueryRunner } from 'typeorm';

export class WishDefaults1686685391888 implements MigrationInterface {
  name = 'WishDefaults1686685391888';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."offer" ALTER COLUMN "amount" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "price" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "raised" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "raised" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "raised" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "raised" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "price" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."offer" ALTER COLUMN "amount" TYPE numeric`,
    );
  }
}
