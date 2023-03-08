import { generateHash } from 'src/core/utils/hash.utils';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UseDto } from '../../../../core/decorators/use-dto.decorator';
import { BaseEntity } from '../../../../core/common/base.entity';

@Entity()
@UseDto(UserDto)
export class User extends BaseEntity<UserDto> {
  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = generateHash(this.password);
  }
}
