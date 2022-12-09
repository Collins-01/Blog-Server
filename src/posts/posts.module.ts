import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import PostsRepository from './posts.repository';
import PostsReactionsRepository from './posts_reactions.repository';
import PostsReactionService from './posts.reactions.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostsRepository,PostsReactionsRepository,PostsReactionService],
})
export class PostsModule {}
