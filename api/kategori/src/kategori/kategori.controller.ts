import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';

@Controller('kategori')
export class KategoriController {
  constructor(private readonly kategoriService: KategoriService) {}

  @Post()
  create(@Body() createKategoriDto: CreateKategoriDto) {
    return this.kategoriService.create(createKategoriDto);
  }

  @Get()
  findAll() {
    return this.kategoriService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kategoriService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKategoriDto: UpdateKategoriDto) {
    return this.kategoriService.update(+id, updateKategoriDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kategoriService.remove(+id);
  }
}
