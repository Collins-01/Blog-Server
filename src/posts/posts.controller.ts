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
import { PageOptions } from 'src/types/pagination';
import FindOneParams from 'src/utils/find_one_params';
import UserModel from 'src/users/models/user.model';
import { ApiTags } from '@nestjs/swagger';
import PostsReactionService from './posts.reactions.service';
import PostsReactionDto from './dto/post-reaction.dto';

// ✅⭐️
@Controller('posts')
@ApiTags('Posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private postsReactionsService: PostsReactionService,
  ) {}

  //* ✅
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

  // ? Written but not tested.
  @Get('all')
  async getAllPosts(@Res() res: Response, @Query() pageOptions: PageOptions) {
    const data = await this.postsService.getAllPosts(pageOptions);
    return res.status(200).json({
      status: true,
      ...data,
    });
  }

  // ? Written but not tested.
  @Get('all/me')
  async getMyPosts(
    @Res() res: Response,
    @GetUser() user: UserModel,
    @Query() pageOptions: PageOptions,
  ) {
    const posts = await this.postsService.getAllMyPosts(user.id, pageOptions);
    return res.status(200).json({
      status: true,
      data: {
        posts: posts,
      },
    });
  }

  // ? Written but not tested.
  @Get(':id')
  async getOnPostById(@Param() { id }: FindOneParams, @Res() res: Response) {
    const post = await this.postsService.findOnePostById(id);
    return res.status(200).json({
      status: true,
      data: {
        ...post,
      },
    });
  }

  // ? Written but not tested.
  @Delete(':id')
  async deletePost(
    @Param() { id }: FindOneParams,
    @GetUser() user: UserModel,
    @Res() res: Response,
  ) {
    await this.postsService.deletePost(id, user.id);
    return res.status(200).json({
      status: true,
      message: `Successfully deleted  post ${id}.`,
    });
  }

  @Patch(':id')
  async updatePost(
    @Body() dto: UpdatePostDto,
    @Res() res: Response,
    @GetUser() user: UserModel,
    @Param() { id }: FindOneParams,
  ) {
    const post = await this.postsService.updatePost(user.id, dto, id);
    return res.status(200).json({
      status: true,
      message: `Successfully updated post.`,
      data: {
        post,
      },
    });
  }

  // *Reactions

  // ? Written But not tested.
  @Post('reactions/create')
  async createReaction(
    @GetUser() user: UserModel,
    @Res() res: Response,
    @Body() dto: PostsReactionDto,
  ) {
    await this.postsReactionsService.createReaction(
      dto.postId,
      user.id,
      dto.reaction,
    );
    return res.status(200).json({
      status: true,
      message: 'Successfully reacted to post.',
    });
  }
  @Delete('reactions/remove')
  async removeReaction(
    @GetUser() user: UserModel,
    @Res() res: Response,
    @Body() { id }: FindOneParams,
  ) {
    await this.postsReactionsService.removeReaction(id, user.id);
    return res.status(200).json({
      status: true,
      message: 'Successfully unreacted to post.',
    });
  }
  @Patch('reactions/update')
  async updateReaction(
    @GetUser() user: UserModel,
    @Res() res: Response,
    @Body() dto: PostsReactionDto,
  ) {
    await this.postsReactionsService.updateReaction(
      dto.postId,
      user.id,
      dto.reaction,
    );
    return res.status(200).json({
      status: true,
      message: 'Successfully updated your reaction to post.',
    });
  }

  @Get('reactions/:id')
  async getAllReactionsForPost(
    @Param() { id }: FindOneParams,
    @Res() res: Response,
  ) {
    const response = await this.postsReactionsService.getALlReactionsForPost(
      id,
    );
    return res.status(200).json({
      status: true,
    });
  }
}
