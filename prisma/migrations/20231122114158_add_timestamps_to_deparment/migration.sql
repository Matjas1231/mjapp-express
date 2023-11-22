-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Department" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Department" ("name") SELECT "name" FROM "Department";
DROP TABLE "Department";
ALTER TABLE "new_Department" RENAME TO "Department";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
