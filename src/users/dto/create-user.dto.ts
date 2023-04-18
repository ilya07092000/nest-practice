import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsString({ message: 'Should Be A String' })
  @IsEmail({}, { message: 'Is not valid email' })
  readonly email: string;

  @ApiProperty({ example: 'test123' })
  @IsString({ message: 'Should Be A String' })
  @Length(8, 16, { message: 'Password Should Be Between 8 and 16 characters' })
  readonly password: string;
}
