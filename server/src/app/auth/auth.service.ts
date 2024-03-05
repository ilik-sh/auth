import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { SecurityService } from 'libs/security/security.service';
import { UserRepository } from 'repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly securityService: SecurityService,
  ) {}

  async findUserByEmail(user: Pick<User, 'email'>) {
    return await this.userRepository.findByEmail(user.email);
  }

  async findUserById(user: Pick<User, 'id'>) {
    return await this.userRepository.findById(user.id);
  }

  async comparePasswords(user: Pick<User, 'password'>, password: string) {
    return await this.securityService.comparePasswords(password, user.password);
  }

  async createUser(
    user: Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>,
  ) {
    const hashedPassword = await this.securityService.hashPassword(
      user.password,
    );

    return await this.userRepository.createNewUser({
      ...user,
      password: hashedPassword,
    });
  }

  generateTokens(user: User) {
    return this.securityService.generateTokens(user);
  }
}
