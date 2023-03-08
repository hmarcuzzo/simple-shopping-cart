import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostgresDatabaseModule } from './database/postgresql/postgres_database.module';
import { MongodbModule } from './database/mongodb/mongodb.module';

@Module({
  imports: [AuthModule, PostgresDatabaseModule, MongodbModule, UserModule],
})
export class InfrastructureModule {}
