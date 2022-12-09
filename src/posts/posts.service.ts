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
  constructor(private postsRepository: PostsRepository) {}

  async createPosts(dto: CreatePostDto, userID: number) {
    return await this.postsRepository.createPost(dto, userID);
  }

  async getAllPosts(pageOptions: PageOptions) {
    const idToSkip = 0;
    const { items, count } = await this.postsRepository.getAllPosts(
      pageOptions,
      idToSkip,
    );

    const meta = new Meta({ itemCount: count, pageOptions });
    const page = new Page(items, meta);
    return page;
  }

  async getAllMyPosts(id: number, pageOptions: PageOptions) {
    const idToSkip = 0;
    return await this.postsRepository.getAllPostsForUser(
      pageOptions,
      idToSkip,
      id,
    );
  }
  async findOnePostById(id: number) {
    return await this.postsRepository.findPostById(id);
  }

  async updatePost(userId: number, dto: UpdatePostDto, postId: number) {
    return await this.postsRepository.updatePost(dto, userId, postId);
  }

  async deletePost(id: number, userId: number) {
    return await this.postsRepository.deletePost(id, userId);
  }
}
