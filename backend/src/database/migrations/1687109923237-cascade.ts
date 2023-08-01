import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cascade1687109923237 implements MigrationInterface {
  name = 'Cascade1687109923237';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "price" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."wish" ALTER COLUMN "price" SET DEFAULT '0'`,
    );
  }
}
