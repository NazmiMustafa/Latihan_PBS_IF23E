// nama di rifectre = untuk mempermudah atau untuk bagian yang berulang
// buat fungsi untuk cek data kategori
// jika tidak ditemukan

import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const notExistKategori = async (id: number, prisma: PrismaService) => {
  //tampilkan data kategori sesuai id
  const data = await prisma.kategori.findUnique({
    where: { id: id },
  });

  //jika data kategori tidak ditemukan
  if (!data) {
    throw new NotFoundException({
      success: false,
      message: process.env.NOT_DATA,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  return data;
};
