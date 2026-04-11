import { PartialType } from '@nestjs/mapped-types';
import { CreateKategoriDto } from './create-kategori.dto';

export class UpdateKategoriDto extends PartialType(CreateKategoriDto) {}
