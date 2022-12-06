import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Response } from 'express';
import { GetUser } from 'src/auth/decorators/get-current-user.decorator';
import { User } from '@prisma/client';
import { PageOptions } from 'src/types/pagination';
import FindOneParams from 'src/utils/find_one_params';
import UserModel from 'src/users/models/user.model';
import { ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('Posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('raw_posts')
  async getRawPosts() {
    return this.postsService.getRawPosts();
  }

  @Post('create')
  async createPost(
    @Body() dto: CreatePostDto,
    @Res() res: Response,
    @GetUser() user: UserModel,
  ) {
    const post = await this.postsService.createPosts(dto, user.id);
    return res.status(201).json({
      status: true,
      data: {
        ...post,
      },
    });
  }

  @Get('all')
  async getAllPosts(@Res() res: Response, @Query() pageOptions: PageOptions) {
    const data = await this.postsService.getAllPosts(pageOptions);

    return res.status(200).json({
      status: true,
      ...data
    });
  }

  @Get('all/me')
  async getMyPosts(id: string, @Res() res: Response, @GetUser() user: User) {
    const posts = await this.postsService.getAllMyPosts(user.id);
    return res.status(200).json({
      status: true,
      data: {
        posts: posts,
      },
    });
  }

  @Get(':id')
  async getOnPostById(@Param() {id}: FindOneParams, @Res() res: Response) {
    const post = await this.postsService.findOnePostById(+id);
    if (!post) {
      throw new NotFoundException(`No post found.`);
    }
    return res.status(200).json({
      status: true,
      data: {
        ...post,
      },
    });
  }

  @Get('author/:id')
  async findOnePostByUserID(@Param() {id}: FindOneParams, @Res() res: Response) {
    const posts = await this.postsService.findOnePostByUserID(id);
    return res.status(200).json({
      status: true,
      data: {
        ...posts,
      },
    });
  }

  @Delete(':id')
  async deletePost(
    @Param() {id}: FindOneParams,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    await this.postsService.deletePost(+id);
    return res.status(200).json({
      status: true,
      message: `Successfully deleted  post ${id}.`,
    });
  }
}
