import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri =
          config.get<string>('MONGODB_URI') ||
          config.get<string>('MONGO_URI') ||
          process.env.MONGODB_URI ||
          process.env.MONGO_URI;

        if (!uri) {
          throw new Error('Database connection string (MONGO_URI) is not defined!');
        }

        return { uri };
      },
    }),
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}