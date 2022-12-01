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

  async getRawPosts() {
    return this.postsRepository.getAllPosts();
  }

  async createPosts(dto: CreatePostDto, userID: number) {
    try {
      const post = await this.postsRepository.createPost(dto, userID);
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllPosts(pageOptions: PageOptions) {
    // const posts = await this.prisma.post.findMany({
    //   take: pageOptions.take,
    //   skip: pageOptions.skip,
    // });
    const { items, count } = await this.postsRepository.getAllPosts(
      0,
      pageOptions.take,
      0,
    );
    // const itemCount = await this.prisma.post.count();
    const meta = new Meta({ itemCount: count, pageOptions });
    const page = new Page(items, meta);
    return page;
  }

  async getAllMyPosts(id: string) {
    const posts = await this.prisma.post.findMany({
      where: {
        userID: id,
      },
    });
    return posts;
  }
  async findOnePostById(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    return post;
  }

  async findOnePostByUserID(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {},
    });
    return post;
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

  async deletePost(id: string, userID: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException(`No post found for ${id}`);
    }
    if (post.userID !== userID) {
      throw new BadRequestException(
        `You can only delete a post you created yourself.`,
      );
    }

    const item = await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
    return item;
  }
}
