import { MigrationInterface, QueryRunner } from 'typeorm';

export class DescToAbout1686679641043 implements MigrationInterface {
  name = 'DescToAbout1686679641043';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."user" RENAME COLUMN "description" TO "about"`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."user" RENAME COLUMN "about" TO "description"`,
    );
  }
}
