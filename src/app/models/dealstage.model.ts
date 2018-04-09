
type CompanyArray = Array<{
  id: number;
  title: string
}>;

export class DealStageModel {

  private _id: number;
  private _title: string;
  private _company: CompanyArray;

  constructor (obj?: any) {
    this._id = obj && obj.id ? obj.id : null;
    this._title = obj && obj.title ? obj.title : null;
    this._company = obj && obj.company ? obj.company : [];
  }

  get id():number {
    return this._id;
  }

  get title():string {
    return this._title
  }

  get company(): CompanyArray {
    return this._company;
  }

  static fromArray(array: any): Array<DealStageModel> {
    let newArray: Array<DealStageModel> = [];

    for ( let item of array ) {
      newArray.push(new DealStageModel(item));
    }

    return newArray;
  }
}
