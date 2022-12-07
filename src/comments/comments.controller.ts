import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import FindOneParams from 'src/utils/find_one_params';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import FindSingleCommentQuery from './dto/find_single_comment_query.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Response } from 'express';
import CommentsReactionDto from './reactions/comment_reaction.dto';
import { ApiTags } from '@nestjs/swagger';
import { PageOptions } from 'src/types/pagination';
import UserModel from 'src/users/models/user.model';
import { GetUser } from 'src/auth/decorators/get-current-user.decorator';

@Controller('comments')
@ApiTags('Comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: UserModel,
  ) {
    return this.commentsService.createComment(createCommentDto, user.id);
  }

  // * Get All Comments for a post
  //* comments/postId
  @Get('all/:id')
  async getComments(
    @Param() { id }: FindOneParams,
    @Res() res: Response,
    @Query() options: PageOptions,
  ) {
    const comments = await this.commentsService.findCommentsForPost(
      id,
      options,
    );
    return res.status(200).json({
      status: true,
      data: {
        comments,
      },
    });
  }

  @Delete(':id')
  remove(@Param() { id }: FindOneParams) {
    return this.commentsService.remove(id);
  }

  @Post('reactions/like')
  async likeComment(@Body() dto: CommentsReactionDto, @Res() res: Response) {
    await this.commentsService.likeComment(dto);
    return res.status(200).json({
      success: true,
      message: `Reacted to comment successfully.`,
    });
  }

  @Post('reactions/unlike')
  async unlikeComment(@Body() dto: CommentsReactionDto, @Res() res: Response) {
    await this.commentsService.likeComment(dto);
    return res.status(200).json({
      success: true,
      message: `Successfully unliked comment.`,
    });
  }
}
