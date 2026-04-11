import { Module } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { KategoriController } from './kategori.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [KategoriController],
  providers: [KategoriService, PrismaService],
})
export class KategoriModule {}
