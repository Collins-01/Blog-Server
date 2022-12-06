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

@Controller('comments')
@ApiTags('Comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  // * Get All Comments for a post
  //* comments/postId
  @Get('all/:id')
  async getComments(@Param() { id }: FindOneParams, @Res() res: Response) {
    const comments = await this.commentsService.getAllComments(id);
    return res.status(200).json({
      status: true,
      data: {
        comments,
      },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param() { id }: FindOneParams) {
    return this.commentsService.remove(+id);
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
