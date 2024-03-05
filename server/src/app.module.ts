import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import securityConfig from './config/security.config';
import { AuthGuard } from '@nestjs/passport';
import { AuthModule } from 'app/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [securityConfig],
      isGlobal: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
