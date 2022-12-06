import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import {
  Meta,
  Page,
  PageMetaParameters,
  PageOptions,
} from 'src/types/pagination';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import PostsRepository from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private postsRepository: PostsRepository,
  ) {}

  async createPosts(dto: CreatePostDto, userID: number) {
    try {
      const post = await this.postsRepository.createPost(dto, userID);
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllPosts(pageOptions: PageOptions) {
    const { items, count } = await this.postsRepository.getAllPosts(
      pageOptions,
      0,
    );

    const meta = new Meta({ itemCount: count, pageOptions });
    const page = new Page(items, meta);
    return page;
  }

  async getAllMyPosts(id: number, pageOptions: PageOptions) {
    return await this.postsRepository.getAllPostsForUser(pageOptions, 0);
  }
  async findOnePostById(id: number) {
    return await this.postsRepository.findPostById(id);
  }

  async updatePost(id: string, dto: UpdatePostDto) {
    try {
      const post = await this.prisma.post.update({
        where: {
          id,
        },
        data: {},
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deletePost(id: number, userId: number) {
    return await this.postsRepository.deletePost(id, userId);
  }
}
