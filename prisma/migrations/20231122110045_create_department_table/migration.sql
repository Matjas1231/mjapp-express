-- CreateTable
CREATE TABLE "Department" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Worker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "departmentId" INTEGER,
    CONSTRAINT "Worker_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Worker" ("created_at", "first_name", "id", "last_name", "phone", "position", "updated_at") SELECT "created_at", "first_name", "id", "last_name", "phone", "position", "updated_at" FROM "Worker";
DROP TABLE "Worker";
ALTER TABLE "new_Worker" RENAME TO "Worker";
CREATE INDEX "Worker_first_name_idx" ON "Worker"("first_name");
CREATE INDEX "Worker_last_name_idx" ON "Worker"("last_name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
