import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from 'src/prisma.service';
import { metadata } from 'reflect-metadata/no-conflict';

@Injectable()
export class KategoriService {
  // buat construktor untuk prisma
  constructor(private readonly prisma: PrismaService) {}

  //buat  fungsi tambah data
  async create(CreateKategoriDto: CreateKategoriDto) {
    //return 'This action adds a new kategori';

    //buat variabel untuk filter nama
    const nama_filter = CreateKategoriDto.nama
      .trim()
      .replace(/\s/g, '')
      .toUpperCase();

    //cek apakah data kategori sudah ada/belum
    const exist = await this.prisma.kategori.findFirst({
      where: {
        nama_filter: nama_filter,
      },
    });

    //jika data kategori sudah ada
    if (exist) {
      throw new ConflictException({
        success: false,
        messae: process.env.FAILED_SAVE,
        metadaataa: {
          status: HttpStatus.CONFLICT,
        },
      });
    }
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
      //tampilkan data kategori sesuai id
      const data = await this.prisma.kategori.findUnique({
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
      if (error instanceof NotFoundException){
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: process.env.NUMBER_ONLY,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  //buat fungsi untuk ubah data
  async update(id: number, updateKategoriDto: UpdateKategoriDto) {
    try {
      //tampilkan data kategori sesuai id
      const data = await this.prisma.kategori.findUnique({
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

      //buat variabel untuk filter nama
      // ?? (nullish operator)
      // || (or)
      const nama_filter = (updateKategoriDto.nama ?? '')
        .trim()
        .replace(/\s/g, '')
        .toUpperCase();

      //cek apakah data kategori sudah ada/belum
      const exist = await this.prisma.kategori.findFirst({
        where: {
          NOT: { id: id },
          nama_filter: nama_filter,
        },
      });

      //jika data kategori sudah ada
      if (exist) {
        throw new ConflictException({
          success: false,
          messae: process.env.FAILED_UPDATE,
          metadaataa: {
            status: HttpStatus.CONFLICT,
          },
        });
      }
      
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

      if (error instanceof HttpException){
        throw error;
      }

      // error lain (misal ID bukan angka)
      throw new BadRequestException({
        success: false,
        message: process.env.NUMBER_ONLY,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  //buat fungsi hapus adata
  async remove(id: number) {
    try {
      //tampilkan data kategori sesuai id
      const data = await this.prisma.kategori.findUnique({
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
      if (error instanceof NotFoundException){
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: process.env.NUMBER_ONLY,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }
}