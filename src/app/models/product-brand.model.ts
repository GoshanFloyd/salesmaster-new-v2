export interface IProductBrandCreate {
  id: number;
  title: string,
  direction: string;
}

export class ProductBrandModel {

  private _id: number;
  private _title: string;
  private _direction: string;

  constructor (obj: IProductBrandCreate) {
    this._id = obj.id ? obj.id : null;
    this._title = obj.title ? obj.title : null;
    this._direction = obj.direction ? obj.direction : null;
  }

  static fromArray(array: Array<IProductBrandCreate>) : Array<ProductBrandModel> {
    let newArray: Array<ProductBrandModel> = [];

    for (let item of array) {
      newArray.push(new ProductBrandModel(item))
    }

    return newArray;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get direction(): string {
    return this._direction;
  }
}
