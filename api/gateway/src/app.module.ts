import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KategoriModule } from './kategori/kategori.module';

@Module({
  imports: [KategoriModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
