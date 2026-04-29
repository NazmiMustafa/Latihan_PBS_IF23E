import {
  // BadRequestException,
  // ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from 'src/prisma.service';
import { notExistKategori } from 'src/common/utils/not-exist-kategori.util';
import { conflictKategori } from 'src/common/utils/conflict-kategori.util';
import { badRequestKategori } from 'src/common/utils/bad-request-kategori.util';

@Injectable()
export class KategoriService {
  // buat construktor untuk prisma
  constructor(private readonly prisma: PrismaService) {}

  //buat  fungsi tambah data
  async create(CreateKategoriDto: CreateKategoriDto) {
    //return 'This action adds a new kategori';

    //panggil fungsi conflictkategori
    const nama_filter = await conflictKategori(
      CreateKategoriDto.nama,
      process.env.FAILED_SAVE!,
      this.prisma,
      0,
    );

    //jika data kategori belum ada

    // simpan data kategori
    await this.prisma.kategori.create({
      data: {
        nama: CreateKategoriDto.nama,
        nama_filter: nama_filter,
      },
    });

    // tampilan respon
    return {
      successs: true,
      message: process.env.SUCCESS_SAVE,
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  async findAll() {
    //pariabel untk tampil data kategori
    const data = await this.prisma.kategori.findMany();

    //jika data kategori tdk ditemukan
    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: process.env.NOT_DATA,
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }
    //jika data kategori ditemukan
    return {
      success: true,
      message: process.env.ALL_DATA,
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data: data,
    };
  }

  // buat fungsi untk detail data
  async findOne(id: number) {
    try {
      // panggil fungsi notExistKategori
      const data = await notExistKategori(id, this.prisma);

      //jika data kategori ditemukan
      return {
        success: true,
        message: process.env.ONE_DATA,
        metadata: {
          status: HttpStatus.OK,
        },
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      //memanggil fungsi badRequestKategori
      badRequestKategori(process.env.NUMBER_ONLY!);
    }
  }

  //buat fungsi untuk ubah data
  async update(id: number, updateKategoriDto: UpdateKategoriDto) {
    try {
      // panggil fungsi notExistKategori
      await notExistKategori(id, this.prisma);

      //buat variabel untuk filter nama
      // ?? (nullish operator)
      // || (or)

      //panggil fungsi conflictKategori
      const nama_filter = await conflictKategori(
        updateKategoriDto.nama ?? '',
        process.env.FAILDE_UPDATE!,
        this.prisma,
        id,
      );

      //Jika data kategori belum ada
      //ubah data kategori berdasarkan id
      await this.prisma.kategori.update({
        where: { id: id },
        data: {
          nama: updateKategoriDto.nama,
          nama_filter: nama_filter,
        },
      });

      //jika data kategori ditemukan
      return {
        success: true,
        message: process.env.SUCCESS_UPDATE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // if (
      //   error instanceof NotFoundException ||
      //   error instanceof ConflictException
      // ){
      //   throw error;
      // }

      if (error instanceof HttpException) {
        throw error;
      }

      //memanggil fungsi badRequestKategori
      badRequestKategori(process.env.NUMBER_ONLY!);
    }
  }

  //buat fungsi hapus adata
  async remove(id: number) {
    try {
      // panggil fungsi notExistKategori
      await notExistKategori(id, this.prisma);

      await this.prisma.kategori.delete({
        where: { id: id },
      });

      //jika data kategori ditemukan
      return {
        success: true,
        message: process.env.SUCCESS_DELETE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      //memanggil fungsi badRequestKategori
      badRequestKategori(process.env.NUMBER_ONLY!);
    }
  }
}
