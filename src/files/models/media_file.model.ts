export interface MediaFileModelData {
  id: number;
  key: string;
  url: string;
}

export default class MediaFileModel {
  id: number;
  key: string;
  url: string;
  constructor(data: MediaFileModelData) {
    this.id = data.id;
    this.key = data.key;
    this.url = data.url;
  }
}
