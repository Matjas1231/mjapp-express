/*
  Warnings:

  - The primary key for the `Department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `department_id` on the `Worker` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Department" (
    "name" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Department" ("name") SELECT "name" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");
CREATE TABLE "new_Worker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "department_name" TEXT,
    CONSTRAINT "Worker_department_name_fkey" FOREIGN KEY ("department_name") REFERENCES "Department" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Worker" ("created_at", "first_name", "id", "last_name", "phone", "position", "updated_at") SELECT "created_at", "first_name", "id", "last_name", "phone", "position", "updated_at" FROM "Worker";
DROP TABLE "Worker";
ALTER TABLE "new_Worker" RENAME TO "Worker";
CREATE INDEX "Worker_first_name_idx" ON "Worker"("first_name");
CREATE INDEX "Worker_last_name_idx" ON "Worker"("last_name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
