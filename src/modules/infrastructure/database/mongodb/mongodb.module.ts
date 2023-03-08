import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      dbName: process.env.MONGO_DBNAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class MongodbModule {}
