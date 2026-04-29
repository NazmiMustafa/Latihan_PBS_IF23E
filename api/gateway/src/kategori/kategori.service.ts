import { Injectable } from '@nestjs/common';
import { kategori_api } from '../common/kategori.instance';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';

// buat interface untuk data kategori
export interface Kategori {
  id: number;
  nama: string;
  nama_filter: string;
}
@Injectable()
export class KategoriService {
  private readonly base_url = 'http://localhost:3001/api/kategori';
  // buat variabel untuk endpoint kategori

  // fungsi untuk akses
  // endpoint kategori (create)
  async create(createKategoriDto: CreateKategoriDto): Promise<Kategori> {
    // return 'This action adds a new kategori';
    const response = await kategori_api.post<Kategori>('/', createKategoriDto);
    return response.data;
  }

  // fungsi untuk akses
  // endpoint kategori (findAll)
  async findAll(): Promise<Kategori[]> {
    // return `This action returns all kategori`;
    const response = await kategori_api.get<Kategori[]>('/');
    return response.data;
  }

  // fungsi untuk akses
  // endpoint kategori (findOne)
  async findOne(id: number): Promise<Kategori> {
    // return `This action returns a #${id} kategori`;
    // const response = await axios.get<Kategori>(`${this.base_url}/${id}`);
    // return response.data;
    const response = await kategori_api.get<Kategori>(`/${id}`);
    return response.data;
  }

  async update(
    id: number,
    updateKategoriDto: UpdateKategoriDto,
  ): Promise<Kategori> {
    // return `This action updates a #${id} kategori`;
    const response = await kategori_api.patch<Kategori>(
      `/${id}`,
      updateKategoriDto,
    );
    return response.data;
  }

  async remove(id: number): Promise<Kategori> {
    // return `This action removes a #${id} kategori`;
    const response = await kategori_api.delete<Kategori>(`/${id}`);
    return response.data;
  }
}
