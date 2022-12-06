import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import { PostReactionType } from './models/post_reaction.model';

@Injectable()
export default class PostsReactionsRepository {
  constructor(private databaseService: DatabaseService) {}



  async createReaction(postId:number, reaction:PostReactionType){}



}
