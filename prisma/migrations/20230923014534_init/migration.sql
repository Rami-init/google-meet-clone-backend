-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pic" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "meetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meet" (
    "id" TEXT NOT NULL,
    "enableScreenSharing" BOOLEAN NOT NULL DEFAULT true,
    "enableChat" BOOLEAN NOT NULL DEFAULT true,
    "enableMicrophone" BOOLEAN NOT NULL DEFAULT true,
    "enableVideo" BOOLEAN NOT NULL DEFAULT true,
    "enableWhiteboard" BOOLEAN NOT NULL DEFAULT false,
    "enableNotes" BOOLEAN NOT NULL DEFAULT false,
    "organizerAdministration" BOOLEAN NOT NULL DEFAULT true,
    "enableNotifications" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER,
    "hostId" TEXT NOT NULL,

    CONSTRAINT "Meet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedBack" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "meetId" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedBack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MEETS_HISTORY" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MEETS_HISTORY_AB_unique" ON "_MEETS_HISTORY"("A", "B");

-- CreateIndex
CREATE INDEX "_MEETS_HISTORY_B_index" ON "_MEETS_HISTORY"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_meetId_fkey" FOREIGN KEY ("meetId") REFERENCES "Meet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meet" ADD CONSTRAINT "Meet_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedBack" ADD CONSTRAINT "FeedBack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedBack" ADD CONSTRAINT "FeedBack_meetId_fkey" FOREIGN KEY ("meetId") REFERENCES "Meet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MEETS_HISTORY" ADD CONSTRAINT "_MEETS_HISTORY_A_fkey" FOREIGN KEY ("A") REFERENCES "Meet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MEETS_HISTORY" ADD CONSTRAINT "_MEETS_HISTORY_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
