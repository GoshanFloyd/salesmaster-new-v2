interface ICompany {
  id: number;
  title: string;
}

interface IEmployee {
  id: number;
  fullname: string;
}

export class DirectoryModel {

  private _id: number;
  private _company: ICompany;
  private _employee: IEmployee;
  private _title: string;
  private _is_private: boolean;

  constructor (obj?: any) {
    this._id = obj && obj.id ? obj.id : null;
    this._company = obj && obj.company ? obj.company : {
      id: null,
      title: null
    };
    this._employee = obj && obj.employee ? obj.employee : {
      id: null,
      fullname: null
    };
    this._title = obj && obj.title ? obj.title : null;
    this._is_private = obj && obj.is_private != null ? obj.is_private : null;
  }

  static fromArray(array: any): Array<DirectoryModel> {
    const newArray: Array<DirectoryModel> = [];

    for (const item of array) {
      newArray.push(new DirectoryModel(item));
    }

    return newArray;
  }

  get id(): number {
    return this._id;
  }

  get company(): ICompany {
    return this._company;
  }

  get employee(): IEmployee {
    return this._employee;
  }

  get title(): string {
    return this._title;
  }

  get is_private(): boolean {
    return this._is_private;
  }
}
