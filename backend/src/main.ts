import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so Next.js frontend on port 3000 can talk to NestJS on port 5000
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(5000);
  console.log('Backend server running on http://localhost:5000');
}
bootstrap();