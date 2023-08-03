import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeUsernameUnique1687466299373 implements MigrationInterface {
    name = 'MakeUsernameUnique1687466299373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kupipodariday"."user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kupipodariday"."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
      }

}
