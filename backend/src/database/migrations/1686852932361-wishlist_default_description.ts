import { MigrationInterface, QueryRunner } from 'typeorm';

export class WishlistDefaultDescription1686852932361
  implements MigrationInterface
{
  name = 'WishlistDefaultDescription1686852932361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "price" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "raised" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wishlist" ALTER COLUMN "description" SET DEFAULT 'None'`,
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
      `ALTER TABLE "kupipodariday"."wishlist" ALTER COLUMN "description" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "raised" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "price" TYPE numeric`,
    );
  }
}
