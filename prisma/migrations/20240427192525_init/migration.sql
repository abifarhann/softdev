-- CreateTable
CREATE TABLE "Astronaut" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "kebangsaan" TEXT NOT NULL,
    "isInSpace" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Astronaut_pkey" PRIMARY KEY ("id")
);
