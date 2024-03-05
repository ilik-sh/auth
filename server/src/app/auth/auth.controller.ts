import {
  Controller,
  Get,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body } from '@nestjs/common';
import { CurrentUser } from 'libs/security/decorators/current-user.decorator';
import { UserSessionDto } from 'dtos/user-session.dto';
import { RefreshTokenGuard } from 'libs/security/guards/refresh-token.guard';
import { AccessTokenGuard } from 'libs/security/guards/access-token.guard';
import { SignUpForm } from './forms/sign-up.form';
import { SignInForm } from './forms/sign-in.form';
import { ErrorMessage } from 'enums/error-messages.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpForm) {
    const existingUser = await this.authService.findUserByEmail(body);
    if (existingUser) {
      throw new InternalServerErrorException(ErrorMessage.UserAlreadyExists);
    }

    if (body.password !== body.confirmPassword) {
      throw new InternalServerErrorException(ErrorMessage.PasswordsDontMatch);
    }

    const newUser = await this.authService.createUser(body);
    if (!newUser) {
      throw new InternalServerErrorException(ErrorMessage.UserCreationFailed);
    }

    const tokens = this.authService.generateTokens(newUser);
    return tokens;
  }

  @Post('signin')
  async signin(@Body() body: SignInForm) {
    const existingUser = await this.authService.findUserByEmail(body);
    if (!existingUser) {
      throw new InternalServerErrorException(ErrorMessage.UserDoesNotExist);
    }

    const tokens = this.authService.generateTokens(existingUser);
    return tokens;
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@CurrentUser() user: UserSessionDto) {
    const existingUser = await this.authService.findUserById(user);
    if (!existingUser) {
      throw new InternalServerErrorException(ErrorMessage.UserDoesNotExist);
    }

    const tokens = this.authService.generateTokens(existingUser);
    return tokens;
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  async me(@CurrentUser() user: UserSessionDto) {
    const existingUser = await this.authService.findUserById(user);
    if (!existingUser) {
      throw new InternalServerErrorException(ErrorMessage.UserDoesNotExist);
    }

    return existingUser;
  }
}
