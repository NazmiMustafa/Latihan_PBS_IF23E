import { BadRequestException, HttpStatus } from '@nestjs/common';

//buat fungsi untuk badRequestKategori
export const badRequestKategori = (message: string) => {
  throw new BadRequestException({
    success: false,
    message: message,
    metadata: {
      status: HttpStatus.BAD_REQUEST,
    },
  });
};
