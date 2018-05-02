
export class ClientLightModel {

  private _id: number;
  private _title: string;
  private _datetime_created: Date;

  constructor (id: number, title: string, datetime_created: any) {
    this._id = id ? id : null;
    this._title = title ? title : 'Empty client';
    this._datetime_created = datetime_created ? new Date(datetime_created) : null;
  }

  public static getClientArray(array: any): ClientLightModel[] {

    let clientArray: ClientLightModel[] = [];

    for(let item of array) {
      clientArray.push(new ClientLightModel(item.id, item.title, item.datetime_created))
    }

    return clientArray;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get datetime_created(): Date {
    return this._datetime_created;
  }

  set id(id: number) {
    this._id = id;
  }

  set title(title: string) {
    this._title = title;
  }

  set datetime_created(datetime_created: Date) {
    this._datetime_created = datetime_created;
  }
}
