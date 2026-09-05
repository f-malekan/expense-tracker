/*
  Warnings:

  - You are about to drop the column `type` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `type`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `emailVerified`,
    DROP COLUMN `image`;
