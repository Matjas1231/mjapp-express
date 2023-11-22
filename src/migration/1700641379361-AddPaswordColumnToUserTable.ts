import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPaswordColumnToUserTable1700641379361 implements MigrationInterface {
    name = 'AddPaswordColumnToUserTable1700641379361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "email") SELECT "id", "username", "email" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "email") SELECT "id", "username", "email" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
