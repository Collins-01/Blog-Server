import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import CommentsReactionDto from './reactions/comment_reaction.dto';
import CommentsReactionRepository from './reactions/comment_reaction.repository';

@Injectable()
export class CommentsService {
  constructor(
    private commentsRepository: CommentsRepository,
    private commentsReactionRepository: CommentsReactionRepository,
  ) {}
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
    console.log(`Coments from Service :: ${response}`);
    return response;
  }
  async likeComment(dto: CommentsReactionDto) {
    return await this.commentsReactionRepository.likeComment(dto);
  }

  async unlikeComment(dto: CommentsReactionDto) {
    return await this.commentsReactionRepository.unlikeComment(dto);
  }
}
