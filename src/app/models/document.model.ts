interface IEmployee {
  id: number;
  fullname: string;
}

export class DocumentModel {

  private _id: number;
  private _directory_title: string;
  private _employee: IEmployee;
  private _file: string;
  private _title: string;
  private _extension: string;
  private _download_count: number;

  constructor (obj?: any) {
    this._id = obj && obj.id ? obj.id : null;
    this._directory_title = obj && obj.directory_title ? obj.directory_title : null;
    this._employee = obj && obj.employee ? obj.employee : {
      id: null,
      fullname: null
    };
    this._file = obj && obj.file ? obj.file : null;
    this._title = obj && obj.title ? obj.title : null;
    this._extension = obj && obj.extension ? obj.extension : null;
    this._download_count = obj && obj.download_count ? obj.download_count : null;
  }

  static fromArray(array: any): Array<DocumentModel> {
    const newArray: Array<DocumentModel> = [];

    for (const item of array) {
      newArray.push(new DocumentModel(item));
    }

    return newArray;
  }

  get id(): number {
    return this._id;
  }

  get directory_title(): string {
    return this._directory_title;
  }

  get employee(): IEmployee {
    return this._employee;
  }

  get file(): string {
    return this._file;
  }

  get title(): string {
    return this._title;
  }

  get extension(): string {
    return this._extension;
  }

  get download_count(): number {
    return this._download_count;
  }
}
