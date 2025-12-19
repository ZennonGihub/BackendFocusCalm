-- AlterTable
ALTER TABLE "auth" ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "pomodoro_sessions" ALTER COLUMN "start_time" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "end_time" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "removed_at" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "id_role" SET DEFAULT 3,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3);

-- CreateIndex
CREATE INDEX "pomodoro_sessions_id_user_start_time_idx" ON "pomodoro_sessions"("id_user", "start_time");
