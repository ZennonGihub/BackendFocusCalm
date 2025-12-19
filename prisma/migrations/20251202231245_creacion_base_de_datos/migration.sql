-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "id_role" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "id_auth" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "id_status" INTEGER NOT NULL DEFAULT 1,
    "estimated_pomodoros" INTEGER NOT NULL DEFAULT 1,
    "completed_pomodoros" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "removed_at" TIMESTAMP(3),
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pomodoro_sessions" (
    "id" SERIAL NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3),
    "duration_minutes" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "id_task" INTEGER,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "pomodoro_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "status_name_key" ON "status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "auth_email_key" ON "auth"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_auth_key" ON "users"("id_auth");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_auth_fkey" FOREIGN KEY ("id_auth") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pomodoro_sessions" ADD CONSTRAINT "pomodoro_sessions_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pomodoro_sessions" ADD CONSTRAINT "pomodoro_sessions_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
