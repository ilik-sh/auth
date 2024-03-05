import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserSessionDto } from 'dtos/user-session.dto';
import * as crypto from 'crypto';

@Injectable()
export class SecurityService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const hash = crypto.createHash('MD5');
    return hash.update(password).digest('hex');
  }

  async comparePasswords(plainPassword: string, hashedPassword: string) {
    return (await this.hashPassword(plainPassword)) === hashedPassword;
  }

  generateTokens(model: User) {
    const payload = UserSessionDto.toPlainObject(model);
    const securityConfig = this.config.get('security');

    const access = securityConfig.access;
    const refresh = securityConfig.refresh;

    const accessToken = this.jwtService.sign(payload, {
      secret: access.secret,
      expiresIn: access.expiry,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: refresh.secret,
      expiresIn: refresh.expiry,
    });

    return { accessToken, refreshToken };
  }
}
