-- CreateTable
CREATE TABLE "Notepad" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notepad_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notepad" ADD CONSTRAINT "Notepad_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
