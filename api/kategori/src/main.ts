import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // + prefix "api"
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT!);
}
void bootstrap();
