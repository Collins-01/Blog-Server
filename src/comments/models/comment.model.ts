export interface CommentModelData {
  id: number;
  comment_content: string;
  author_id: number;
  post_id: number;
  created_at: Date;
  comment_likes: number;
  deletion_date?: Date | null;
}

export default class CommentModel {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  createdAt: Date;
  deletionDate?: Date | null;
  likes: number;
  constructor(data: CommentModelData) {
    this.id = data.id;
    this.content = data.comment_content;
    this.createdAt = data.created_at;
    this.deletionDate = data.deletion_date;
    this.likes = data.comment_likes;
    this.postId = data.post_id;
    this.authorId = data.author_id;
  }
}
