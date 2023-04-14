import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    const result = await this.authService.registration(userDto);

    return result;
  }

  @Post('/login')
  async login(@Body() userDto: CreateUserDto) {
    const result = await this.authService.login(userDto);

    return result;
  }
}
