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
    return {
      ...tokens,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
  }

  @Post('signin')
  async signin(@Body() body: SignInForm) {
    const existingUser = await this.authService.findUserByEmail(body);
    if (!existingUser) {
      throw new InternalServerErrorException(ErrorMessage.UserDoesNotExist);
    }

    const passwordsMatch = await this.authService.comparePasswords(
      existingUser,
      body.password,
    );
    if (!passwordsMatch) {
      throw new InternalServerErrorException(ErrorMessage.UserDoesNotExist);
    }

    const tokens = this.authService.generateTokens(existingUser);
    return {
      ...tokens,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
    };
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(@CurrentUser() user: UserSessionDto) {
    const existingUser = await this.authService.findUserById(user);
    if (!existingUser) {
      throw new InternalServerErrorException(ErrorMessage.UserDoesNotExist);
    }

    existingUser.lastName;

    const tokens = this.authService.generateTokens(existingUser);
    return {
      ...tokens,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
    };
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
