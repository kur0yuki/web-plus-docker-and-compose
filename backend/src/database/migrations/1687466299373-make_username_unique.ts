import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeUsernameUnique1687466299373 implements MigrationInterface {
    name = 'MakeUsernameUnique1687466299373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kupipodariday"."wishlist_items_wish" DROP CONSTRAINT "FK_e686abff4343ad90ca53a7fc123"`);
        await queryRunner.query(`DROP INDEX "kupipodariday"."fki_FK_e686abff4343ad90ca53a7fc123"`);
        await queryRunner.query(`ALTER TABLE "kupipodariday"."user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "kupipodariday"."wishlist_items_wish" ADD CONSTRAINT "FK_20a447bbd8b2e0c58b420300d4d" FOREIGN KEY ("wishId") REFERENCES "kupipodariday"."wish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "kupipodariday"."wishlist_items_wish" DROP CONSTRAINT "FK_20a447bbd8b2e0c58b420300d4d"`);
        await queryRunner.query(`ALTER TABLE "kupipodariday"."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`CREATE INDEX "fki_FK_e686abff4343ad90ca53a7fc123" ON "kupipodariday"."wishlist_items_wish" ("wishId") `);
        await queryRunner.query(`ALTER TABLE "kupipodariday"."wishlist_items_wish" ADD CONSTRAINT "FK_e686abff4343ad90ca53a7fc123" FOREIGN KEY ("wishId") REFERENCES "kupipodariday"."wish"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
