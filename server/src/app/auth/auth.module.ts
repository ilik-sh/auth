import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SecurityModule } from 'libs/security/security.module';
import { PrismaModule } from 'libs/prisma/prisma.module';
import { UserRepository } from 'repositories/user.repository';

@Module({
  imports: [SecurityModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
