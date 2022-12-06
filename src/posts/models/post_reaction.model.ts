export interface PostReactionModelData {
  post_id: number;
  user_id: number;
  reaction: PostReactionType;
}

export default class PostReactionModel {
  postId: number;
  reaction: PostReactionType;
  userId: number;
  constructor(data: PostReactionModelData) {
    this.postId = data.post_id;
    this.userId = data.user_id;
    this.reaction = data.reaction;
  }
}

export enum PostReactionType {
  like = 'like',
  dislike = 'dislike',
  love = 'love',
  wow = 'wow',
  insightful = 'insightful',
}
