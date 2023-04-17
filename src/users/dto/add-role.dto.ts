import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({ example: 'admin' })
  readonly value: string;

  @ApiProperty({ example: '1' })
  readonly userId: string;
}
