// nama di rifectre = untuk mempermudah atau untuk bagian yang berulang

import { ConflictException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

// buat fungsi untuk cek conflict data kategori
export const conflictKategori = async (
  nama: string,
  message: string,
  prisma: PrismaService,
  id?: number,
) => {
  const nama_filter = nama.trim().replace(/\s/g, '').toUpperCase();

  //cek apakah data kategori sudah ada/belum
  const exist = await prisma.kategori.findFirst({
    where: {
      nama_filter: nama_filter,
      ...(id ? { NOT: { id: id } } : {}),
    },
  });

  //jika data kategori sudah ada
  if (exist) {
    throw new ConflictException({
      success: false,
      message: message,
      metadata: {
        status: HttpStatus.CONFLICT,
      },
    });
  }

  return nama_filter;
};
