export interface CommentReactionData {
  comment_id: number;
  liker_id: number;
}

export default class CommentReactionModel {
  commentId: number;
  likerId: number;

  constructor(data: CommentReactionData) {
    this.commentId = data.comment_id;
    this.likerId = data.liker_id;
  }
}
