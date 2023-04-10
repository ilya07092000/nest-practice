import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.port || 8080;
  const app = await NestFactory.create(AppModule);

  await app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));
}

start();
