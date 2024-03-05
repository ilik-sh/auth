import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('security', () => {
  const accessSecret = process.env.ACCESS_SECRET || 'secret';
  const refreshSecret = process.env.REFRESH_SECRET || 'veryOddSecret';

  const accessExpiry = process.env.ACCESS_EXPIRY || '30m';
  const refreshExpiry = process.env.REFRESH_EXPIRY || '30d';

  return {
    access: {
      secret: accessSecret,
      expiry: accessExpiry,
    },
    refresh: {
      secret: refreshSecret,
      expiry: refreshExpiry,
    },
  };
});
