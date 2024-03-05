import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'libs/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findByEmailAndPassword(email: string, password: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  async createNewUser(
    user: Pick<User, 'firstName' | 'lastName' | 'email' | 'password'>,
  ) {
    this.prisma.user.create({
      data: user,
    });
  }
}
