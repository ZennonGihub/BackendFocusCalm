/*
  Warnings:

  - Added the required column `type` to the `pomodoro_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pomodoro_sessions" ADD COLUMN     "type" INTEGER NOT NULL;
