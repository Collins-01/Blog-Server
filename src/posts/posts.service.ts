import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async createPosts(dto: CreatePostDto, userID: string) {
    try {
      const post = await this.prisma.post.create({
        data: {
          backgroundImage: dto.backgroundImage,
          content: dto.content,
          decription: dto.desciption,
          title: dto.title,
          userID,
        },
      });
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllPosts() {
    const posts = await this.prisma.post.findMany();
    return posts;
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
      where: {
        userID: id,
      },
    });
    return post;
  }

  async updatePost(id: string, dto: UpdatePostDto) {}

  async deletePost(id: string, userID: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException(`No post found for ${id}`);
    }
    if (post.userID === userID) {
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
