import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@test.com' })
  readonly email: string;

  @ApiProperty({ example: 'test123' })
  readonly password: string;
}
