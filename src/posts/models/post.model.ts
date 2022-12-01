export interface PostModelData {
  id: number;
  title: string;
  post_content: string;
  author_id: number;
  background_image: string;
  description: string;

}

class PostModel {
  id: number;
  title: string;
  content: string;
  authorId: number;
  backgroundImage: string;
  description: string;
  constructor(data: PostModelData) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.post_content;
    this.authorId = data.author_id;
    this.backgroundImage=data.background_image
    this.description = data.description;
  }
}

export default PostModel;
