/*
  Warnings:

  - You are about to drop the column `decription` on the `posts` table. All the data in the column will be lost.
  - Added the required column `description` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "decription",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "views" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "postID" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "authorID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
