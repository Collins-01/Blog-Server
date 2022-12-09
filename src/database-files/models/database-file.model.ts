export interface DatabaseFileModelData {
  id: number;
  fileName: string;
  data: Uint8Array;
}

export default class DatabaseFileModel {
  id: number;
  fileName: string;
  data: Uint8Array;
  constructor(data: DatabaseFileModelData) {
    this.id = data.id;
    this.fileName = data.fileName;
    this.data = data.data;
  }
}
