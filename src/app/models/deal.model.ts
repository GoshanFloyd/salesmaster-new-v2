
type EmployeeObject = {
  id: number;
  fullname: string;
};

type ClientObject = {
  id: number;
  title: string
};

type ProductObject = {
  id: number;
  brand_title: string;
  title: string
};

type ProductArray = Array<ProductObject>;

export class DealModel {

  private _id: number;
  private _employee: EmployeeObject;
  private _client: ClientObject;
  private _product: ProductArray;
  private _stage_id: number;
  private _title: string;
  private _description: string;
  private _status: string;
  private _total: number;
  private _datetime_created: Date;
  private _datetime_updated: Date;

  constructor(obj?: any) {
    this._id = obj && obj.id ? obj.id : null;
    this._employee = obj && obj.employee ? obj.employee : null;
    this._client = obj && obj.client ? obj.client : null;
    this._product = obj && obj.product ? obj.product : [];
    this._stage_id = obj && obj.stage_id ? obj.stage_id : null;
    this._title = obj && obj.title ? obj.title : null;
    this._description = obj && obj.description ? obj.description : null;
    this._status = obj && obj.status ? obj.status : null;
    this._total = obj && obj.total ? obj.total : 0;
    this._datetime_created = obj && obj.datetime_created ? obj.datetime_created : new Date();
    this._datetime_updated = obj && obj.datetime_updated ? obj.datetime_updated : null;
  }

  static fromArray(array: any): Array<DealModel> {
    let newArray: Array<DealModel> = [];

    for (let item of array) {
      newArray.push(new DealModel(item))
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

  get product(): ProductArray {
    return this._product;
  }

  get stage_id(): number {
    return this._stage_id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get status(): string {
    return this._status;
  }

  get total(): number {
    return this._total;
  }

  get datetime_created(): Date {
    return this._datetime_created;
  }

  get datetime_updated(): Date {
    return this._datetime_updated;
  }

  set stage_id(id: number) {
    this._stage_id = id;
  }

  get datetime_created_format(): string {
    return new Date(this._datetime_created).toLocaleString("ru", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  get objectUpdate(): any {
    return {
      'id': this.id,
      'employee': this.employee.id,
      'client': this.client.id,
      'product': this.product.map(x => x.id),
      'stage_id': this.stage_id,
      'title': this.title,
      'description': this.description,
      'status': this.status,
      'total': this.total
    }
  }
}
