import {ActivityModel} from './activity.model';

type CompanyObject = {
  id: number;
  title: string;
}

export class ProductModel {

  private _id: number;
  private _company: CompanyObject;
  private _brand_title: string;
  private _parent_id: number;
  private _title: string;
  private _description: string;
  private _vendor_code: string;
  private _total: number;
  private _currency: string;
  private _image: string;
  private _call_text: string;

  constructor (obj?: any) {
    this._id = obj && obj.id ? obj.id : null;
    this._company = obj && obj.company ? obj.company : null;
    this._brand_title = obj && obj.brand_title ? obj.brand_title : null;
    this._parent_id = obj && obj.parent_id ? obj.parent_id : null;
    this._title = obj && obj.title ? obj.title : null;
    this._description = obj && obj.description ? obj.description : null;
    this._vendor_code = obj && obj.vendor_code ? obj.vendor_code : null;
    this._total = obj && obj.total ? obj.total : null;
    this._currency = obj && obj.currency ? obj.currency : null;
    this._image = obj && obj.image ? obj.image : null;
    this._call_text = obj && obj.call_text ? obj.call_text : null;
  }

  static fromArray(array: any): Array<ProductModel> {
    let newArray: Array<ProductModel> = [];

    for (let item of array) {
      newArray.push(new ProductModel(item));
    }

    return newArray;
  }

  get id(): number {
    return this._id;
  }

  get company(): CompanyObject {
    return this._company;
  }

  get brand_title(): string {
    return this._brand_title;
  }

  get parent_id(): number {
    return this._parent_id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get vendor_code(): string {
    return this._vendor_code;
  }

  get total(): number {
    return this._total;
  }

  get currency(): string {
    return this._currency;
  }

  get image(): string {
    return this._image;
  }

  get call_text(): string {
    return this._call_text;
  }
}
