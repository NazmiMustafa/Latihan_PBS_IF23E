/*
  Warnings:

  - Added the required column `nama_filter` to the `Kategori` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kategori" ADD COLUMN     "nama_filter" VARCHAR(20) NOT NULL;
