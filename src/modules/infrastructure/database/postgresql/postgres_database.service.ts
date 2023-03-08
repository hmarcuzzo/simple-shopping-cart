import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class PostgresDatabaseService {
  constructor(public connection: Connection) {}

  public async getRepository<T>(entity: any): Promise<Repository<T>> {
    return this.connection.getRepository(entity);
  }
}
