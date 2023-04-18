import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: '1' })
  readonly userId: number;

  @ApiProperty({ example: 'Some Post Title ' })
  readonly title: string;

  @ApiProperty({ example: 'Some Post Content' })
  readonly content: string;

  @ApiProperty({ example: 'Some Post Image Path' })
  readonly image?: string;
}
