import { User } from '@prisma/client';
import { IsUUID } from 'class-validator';

export class UserSessionDto {
  @IsUUID()
  id: string;

  static from(session: UserSessionDto) {
    const it = new UserSessionDto();
    it.id = session.id;
    return it;
  }

  static toPlainObject(user: User) {
    return {
      id: user.id,
    } as UserSessionDto;
  }
}
