import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserSessionDto } from 'dtos/user-session.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserSessionDto;
  },
);
