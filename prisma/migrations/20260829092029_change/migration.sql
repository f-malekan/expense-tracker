/*
  Warnings:

  - You are about to drop the `expense` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `Expense_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `Expense_userId_fkey`;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `type` ENUM('INCOME', 'EXPENSE') NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `expense`;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `type` ENUM('INCOME', 'EXPENSE') NOT NULL,
    `description` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Transaction_userId_idx`(`userId`),
    INDEX `Transaction_categoryId_idx`(`categoryId`),
    INDEX `Transaction_date_idx`(`date`),
    INDEX `Transaction_userId_date_idx`(`userId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Budget` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Budget_userId_idx`(`userId`),
    INDEX `Budget_categoryId_idx`(`categoryId`),
    UNIQUE INDEX `Budget_userId_categoryId_month_year_key`(`userId`, `categoryId`, `month`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Budget` ADD CONSTRAINT `Budget_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Budget` ADD CONSTRAINT `Budget_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `category` RENAME INDEX `Category_userId_fkey` TO `Category_userId_idx`;
