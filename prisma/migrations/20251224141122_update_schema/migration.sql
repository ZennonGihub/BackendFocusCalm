/*
  Warnings:

  - You are about to drop the column `completed_pomodoros` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pomodoro_sessions" ALTER COLUMN "type" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "completed_pomodoros",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "id_status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id_role" SET DEFAULT 1;
