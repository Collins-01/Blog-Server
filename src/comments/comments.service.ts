import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}
  createComment(createCommentDto: CreateCommentDto) {
    return this.commentsRepository.createComment(createCommentDto);
  }

  findCommentsForPost(postId: number) {
    return this.commentsRepository.getCommentsForPost(postId);
  }

  findOne(postId: number, commentId: number) {
    return this.commentsRepository.getSingleCommentForPost(postId, commentId);
  }

  //TODO: update comment
  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return this.commentsRepository.deleteComment(id);
  }
  async getAllComments(postId: number) {
    const response = await this.commentsRepository.getComments(postId);
    console.log(`Coments from Service :: ${response}`)
    return response;
  }
}
