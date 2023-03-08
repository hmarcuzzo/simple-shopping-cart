import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresDatabaseService } from './postgres_database.service';
import * as process from 'process';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database:
        process.env.APP_ENV === 'test'
          ? process.env.TYPEORM_TEST_DATABASE
          : process.env.TYPEORM_DATABASE,
      uuidExtension: 'pgcrypto',
      autoLoadEntities: true,
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      namingStrategy: new SnakeNamingStrategy(),
      keepConnectionAlive: true,
    }),
  ],
  providers: [PostgresDatabaseService],
  exports: [PostgresDatabaseService],
})
export class PostgresDatabaseModule {}
