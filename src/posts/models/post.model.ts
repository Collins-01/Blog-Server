export interface PostModelData {
  id: number;
  title: string;
  post_content: string;
  author_id: number;
  background_image: string;
  description: string;
  likes: number;
  loves: number;
  wows: number;
  insightfuls: number;
}

class PostModel {
  id: number;
  title: string;
  content: string;
  authorId: number;
  backgroundImage: string;
  description: string;
  likes: number;
  loves: number;
  wows: number;
  insightfuls: number;
  constructor(data: PostModelData) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.post_content;
    this.authorId = data.author_id;
    this.backgroundImage = data.background_image;
    this.description = data.description;
    this.likes = data.likes;
    this.loves = data.loves;
    this.wows = data.wows;
    this.insightfuls = data.insightfuls;
  }
}

export default PostModel;
