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
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Response } from 'express';
import { GetUser } from 'src/auth/decorators/get-current-user.decorator';
import { User } from '@prisma/client';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  async createPost(@Body() dto: CreatePostDto, @Res() res: Response,@GetUser() user: User,) {
    const post = await this.postsService.createPosts(dto, user.id);
    return res.status(201).json({
      status: true,
      data: {
        ...post,
      },
    });
  }

  @Get('all')
  async getAllPosts(@Res() res: Response) {
    const posts = await this.postsService.getAllPosts();
    return res.status(200).json({
      status: true,
      data: {
        posts: posts,
      },
    });
  }

  @Get('all/me')
  async getMyPosts(id: string, @Res() res: Response, @GetUser() user: User,) {
    const posts = await this.postsService.getAllMyPosts(user.id);
    return res.status(200).json({
      status: true,
      data: {
        posts: posts,
      },
    });
  }

  @Get(':id')
  async getOnPostById(@Param('id') id: string, @Res() res: Response) {
    const post = await this.postsService.findOnePostById(id);
    if (!post) {
      throw new NotFoundException(`No post found for ${id}`);
    }
    return res.status(200).json({
      status: true,
      data: {
        ...post,
      },
    });
  }

  async findOnePostByUserID(id: string, @Res() res: Response) {
    const post = await this.postsService.findOnePostByUserID(id);
    if (!post) {
      throw new NotFoundException(`No post found for ${id}`);
    }
    return res.status(200).json({
      status: true,
      data: {
        post,
      },
    });
  }

  @Delete('delete/:id')
  async deletePost(
    @Param('"id') id: string,
    @GetUser() user: User,
    @Res() res: Response,
  ) {
    const post = await this.postsService.deletePost(id, user.id);
    return res.status(200).json({
      status: true,
      message: `Successfully deleted  post ${id}.`,
    });
  }
}
