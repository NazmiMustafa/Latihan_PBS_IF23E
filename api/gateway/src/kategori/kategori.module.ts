import { Module } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { KategoriController } from './kategori.controller';

@Module({
  controllers: [KategoriController],
  providers: [KategoriService],
})
export class KategoriModule {}
