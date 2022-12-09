import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import CommentsReactionRepository from './reactions/comment_reaction.repository';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService,CommentsRepository,CommentsReactionRepository]
})
export class CommentsModule {}
