import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test1686609804114 implements MigrationInterface {
  name = 'Test1686609804114';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."user" DROP COLUMN "username"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."user" ADD "username" character varying(30) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."user" DROP COLUMN "username"`,
    );
    await queryRunner.query(
      `ALTER TABLE "kupipodariday"."user" ADD "username" character varying NOT NULL`,
    );
  }
}
