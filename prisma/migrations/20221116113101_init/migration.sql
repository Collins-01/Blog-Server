-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('email', 'google', 'facebook', 'apple');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "provider" "Provider" NOT NULL DEFAULT 'email',
    "isSocialAuth" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "decription" TEXT NOT NULL,
    "backgroundImage" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "hashTags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "posts_userID_key" ON "posts"("userID");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
