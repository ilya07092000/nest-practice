import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body() dto: Omit<CreatePostDto, 'userId'>,
    @UploadedFile() image,
  ) {
    const post: CreatePostDto = { ...dto, image, userId: req.user.id };

    return this.postService.createPost(post);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async deleteById(@Param('id') id: string) {
    return this.postService.detePostById(id);
  }
}
