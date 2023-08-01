import { MigrationInterface, QueryRunner } from 'typeorm';

export class OfferWishFix1686775863260 implements MigrationInterface {
  name = 'OfferWishFix1686775863260';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "price" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "raised" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."offer" ALTER COLUMN "amount" TYPE numeric`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."offer" ALTER COLUMN "amount" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "raised" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "price" TYPE numeric`,
    );
  }
}
