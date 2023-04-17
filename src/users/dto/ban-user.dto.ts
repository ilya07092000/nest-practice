import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ example: 228 })
  readonly userId: string;

  @ApiProperty({ example: 'Some Reasons' })
  readonly banReason: string;
}
