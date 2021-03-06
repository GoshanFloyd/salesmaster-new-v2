
type CompanyArray = Array<{
  id: number,
  title: string
}>

export class ActivityTypeModel {

  private _id: number;
  private _company: CompanyArray;
  private _title: string;

  constructor (obj?: any) {
    this._id = obj && obj.id ? obj.id : null;
    this._company = obj && obj.company ? obj.company : [];
    this._title = obj && obj.title ? obj.title : null;
  }

  get id(): number {
    return this._id;
  }

  get company(): CompanyArray {
    return this._company;
  }

  get title(): string {
    return this._title;
  }

  public static getTypesArray(array: any): ActivityTypeModel[] {

    let typeArray: ActivityTypeModel[] = [];

    for(let item of array) {
      typeArray.push(new ActivityTypeModel(item))
    }

    return typeArray;
  }
}
