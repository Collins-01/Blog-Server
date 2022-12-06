import { Injectable } from '@nestjs/common';
import { PostReactionType } from './models/post_reaction.model';
import PostsReactionsRepository from './posts_reactions.repository';

@Injectable()
export default class PostsReactionService {
  constructor(private postsReactionRepository: PostsReactionsRepository) {}

  async createReaction(
    postId: number,
    userId: number,
    reaction: PostReactionType,
  ) {
    return await this.postsReactionRepository.createReaction(
      postId,
      userId,
      reaction,
    );
  }

  async removeReaction(postId: number, userId: number) {
    return await this.postsReactionRepository.removeReaction(postId, userId);
  }

  async updateReaction(
    postId: number,
    userId: number,
    reaction: PostReactionType,
  ) {
    return await this.postsReactionRepository.updateReaction(
      postId,
      userId,
      reaction,
    );
  }
}
