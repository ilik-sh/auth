import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import securityConfig from './config/security.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [securityConfig],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
