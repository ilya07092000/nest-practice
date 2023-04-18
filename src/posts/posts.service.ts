import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    @InjectModel(User) private userRepository: typeof User,
  ) {}

  async createPost(dto: CreatePostDto) {
    const user = this.userRepository.findByPk(dto.userId);

    if (!user) {
      throw new BadRequestException({ message: 'User Does Not Exist' });
    }

    const post = await this.postRepository.create(dto);
    return post;
  }

  async getPosts() {
    return await this.postRepository.findAll();
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findByPk(id);

    if (!post) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async detePostById(id: string) {
    const post = await this.getPostById(id);
    return post.destroy();
  }
}
