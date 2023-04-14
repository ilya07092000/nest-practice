import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { GenerateTokensDto } from './dto/generate-tokens.dto';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userSerice: UsersService,
  ) {}

  async hashPassword(password: string) {
    return await bcrypt.hash(password, +process.env.PASS_SALT_ROUNDS);
  }

  generateTokens(payload: GenerateTokensDto) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async registration(dto: CreateUserDto) {
    const isUserExists = await this.userSerice.getUserByEmail(dto.email);

    if (isUserExists) {
      throw new HttpException('User Exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.hashPassword(dto.password);
    const user = await this.userSerice.createUser({
      password: hashedPassword,
      email: dto.email,
    });

    const tokens = this.generateTokens({
      id: user.id,
      email: user.email,
      roles: user.roles,
    });

    return { user, tokens };
  }

  async login(dto: CreateUserDto) {
    const currentUser = await this.userSerice.getUserByEmail(dto.email);

    if (!currentUser) {
      throw new UnauthorizedException('Bad Credentials');
    }

    const isValidPassword = await bcrypt.compare(
      dto.password,
      currentUser.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Bad Credentials');
    }

    const tokens = this.generateTokens({
      id: currentUser.id,
      email: currentUser.email,
      roles: currentUser.roles,
    });

    return {
      user: currentUser,
      tokens,
    };
  }
}
