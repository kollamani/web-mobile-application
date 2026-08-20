import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Read allowed origin from environment variables or fallback to local/wildcard
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';

  app.enableCors({
    origin: allowedOrigin === '*' ? true : allowedOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Use Render's dynamic PORT variable or default to 5000
  const port = process.env.PORT || 5000;

  // Bind to '0.0.0.0' so Render can detect and route external web traffic
  await app.listen(port, '0.0.0.0');
  console.log(`Backend server running on port: ${port}`);
}
bootstrap();