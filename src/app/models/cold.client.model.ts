
interface IColdClientObjectCreate {
  id: number;
  company: ICompany;
  was_processed: boolean;
  site_url: string;
  fullname: string;
  email: string;
  phone: string;
  note: string;
  extra: string;
  datetime_created: string;
  datetime_updated: string;
}

interface ICompany {
  id: number;
  title: string;
}

export class ColdClientModel {

  private _id: number;
  private _company: ICompany;
  private _was_processed: boolean;
  private _site_url: string;
  private _fullname: string;
  private _email: string;
  private _phone: string;
  private _note: string;
  private _extra: string;
  private _datetime_created: Date;
  private _datetime_updated: Date;

  constructor (obj: IColdClientObjectCreate) {
    this._id = obj.id;
    this._company = obj.company;
    this._was_processed = obj.was_processed;
    this._site_url = obj.site_url;
    this._fullname = obj.fullname;
    this._email = obj.email;
    this._phone = obj.phone;
    this._note = obj.note;
    this._extra = obj.extra;
    this._datetime_created = new Date(obj.datetime_created);
    this._datetime_updated = new Date(obj.datetime_updated);
  }

  public static fromArray(array: any): Array<ColdClientModel> {
    const newArray: Array<ColdClientModel> = [];

    for (const item of array) {
      newArray.push(new ColdClientModel(item));
    }

    return newArray;
  }

  get id(): number {
    return this._id;
  }

  get company(): ICompany {
    return this._company;
  }

  get was_processed(): boolean {
    return this._was_processed;
  }

  get site_url(): string {
    return this._site_url;
  }

  get fullname(): string {
    return this._fullname;
  }

  get email(): string {
    return this._email;
  }

  get phone(): string {
    return this._phone;
  }

  get note(): string {
    return this._note;
  }

  get extra(): string {
    return this._extra;
  }

  get datetime_created(): Date {
    return this._datetime_created;
  }

  get datetime_updated(): Date {
    return this._datetime_updated;
  }
}