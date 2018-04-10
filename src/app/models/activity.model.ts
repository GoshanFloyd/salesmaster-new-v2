
type EmployeeObject = {
  id: number;
  fullname: string;
};

type ClientObject = {
  id: number;
  title: string;
}

type DealObject = {
  id: number;
  title: string;
}

export class ActivityModel {

  private _id: number;
  private _employee: EmployeeObject;
  private _client: ClientObject;
  private _deal: DealObject;
  private _type_title: string;
  private _description: string;
  private _document: string;
  private _datetime_created: Date;
  private _datetime_updated: Date;

  constructor(obj?: any) {
    this._id = obj && obj.id ? obj.id : null;
    this._employee = obj && obj.employee ? obj.employee : null;
    this._client = obj && obj.client ? obj.client : null;
    this._deal = obj && obj.deal ? obj.deal : null;
    this._type_title = obj && obj.type_title ? obj.type_title : null;
    this._description = obj && obj.description ? obj.description : null;
    this._document = obj && obj.document ? obj.document : null;
    this._datetime_created = obj && obj.datetime_created ? obj.datetime_created : new Date();
    this._datetime_updated = obj && obj.datetime_updated ? obj.datetime_updated : null;
  }

  static fromArray(array: any): Array<ActivityModel> {
    let newArray: Array<ActivityModel> = [];

    for (let item of array) {
      newArray.push(new ActivityModel(item));
    }

    return newArray;
  }

  get id(): number {
    return this._id;
  }

  get employee(): EmployeeObject {
    return this._employee;
  }

  get client(): ClientObject {
    return this._client;
  }

  get deal(): DealObject {
    return this._deal;
  }

  get type_title(): string {
    return this._type_title;
  }

  get description(): string {
    return this._description;
  }

  get document(): string {
    return this._document;
  }

  get datetime_created(): Date {
    return this._datetime_created;
  }

  get datetime_updated(): Date {
    return this._datetime_updated;
  }

  get string_datetime_created(): any {
    return new Date(this.datetime_created).toLocaleString("ru", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }
}
