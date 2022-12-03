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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import FindOneParams from 'src/utils/find_one_params';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import FindSingleCommentQuery from './dto/find_single_comment_query.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get('single')
  findOne(@Query() query: FindSingleCommentQuery) {
    return this.commentsService.findOne(1, 2);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param() { id }: FindOneParams) {
    return this.commentsService.remove(+id);
  }
}
