import { Injectable } from '@nestjs/common';
import { PageOptions } from 'src/types/pagination';
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
  createComment(createCommentDto: CreateCommentDto, userId:number) {
    return this.commentsRepository.createComment(createCommentDto,userId);
  }

  findCommentsForPost(postId: number, pageOptions: PageOptions) {
    const idsToSkip = 0;
    return this.commentsRepository.getCommentsForPost(
      postId,
      pageOptions,
      idsToSkip,
    );
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
  async likeComment(dto: CommentsReactionDto,userId:number) {
    return await this.commentsReactionRepository.likeComment(dto,userId);
  }

  async unlikeComment(dto: CommentsReactionDto,userId:number) {
    return await this.commentsReactionRepository.unlikeComment(dto,userId);
  }
}
