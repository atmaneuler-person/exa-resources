-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PostStats" (
    "postId" TEXT NOT NULL PRIMARY KEY,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "botViews" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_PostStats" ("likes", "postId", "views") SELECT "likes", "postId", "views" FROM "PostStats";
DROP TABLE "PostStats";
ALTER TABLE "new_PostStats" RENAME TO "PostStats";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
