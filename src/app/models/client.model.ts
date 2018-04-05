type CompanyField = {
  title: string;
  id: number;
};

type EmployeeField = {
  fullname: string;
  id: number;
};

type ParentField = {
  title: string;
  id: number;
};

type PhoneArrayField = Array<{
  id: number;
  title: string;
  type: string;
  number: string;
}>;

type EmailArrayField = Array<{
  id: number;
  title: string;
  type: string;
  email: string;
}>;

type CustomFieldsArrayField = Array<{
  id: number;
  key: string;
  value: string;
}>;

export class ClientModel{
  private _id: number;
  private _region_id: number;
  private _company: CompanyField;
  private _employee: EmployeeField;
  private _parent: ParentField;
  private _type: string;
  private _title: string;
  private _street: string;
  private _postcode: string;
  private _requisite: string;
  private _fizlico_type: string;
  private _yurlico_type: string;
  private _yurlico_form: string;
  private _phones: PhoneArrayField;
  private _emails: EmailArrayField;
  private _customfields: CustomFieldsArrayField;
  private _datetime_created: Date;
  private _datetime_updated: Date;

  constructor(obj?: any) {
    this._id = obj && obj.id ? obj.id : null;
    this._region_id = obj && obj.region_id ? obj.region_id : null;
    this._company = obj && obj.company ? obj.company : {
      title: null,
      id: null
    };
    this._employee = obj && obj.employee ? obj.employee : {
      fullname: null,
      id: null
    };
    this._parent = obj && obj.parent ? obj.parent : {
      title: null,
      id: null
    };
    this._type = obj && obj.type ? obj.type : null;
    this._title = obj && obj.title ? obj.title : null;
    this._street = obj && obj.street ? obj.street : null;
    this._postcode = obj && obj.postcode ? obj.postcode : null;
    this._requisite = obj && obj.requisite ? obj.requisite : null;
    this._fizlico_type = obj && obj.fizlico_type ? obj.fizlico_type : null;
    this._yurlico_type = obj && obj.yurlico_type ? obj.yurlico_type : null;
    this._yurlico_form = obj && obj.yurlico_form ? obj.yurlico_form : null;
    this._phones = obj && obj.phones ? obj.phones : [];
    this._emails = obj && obj.emails ? obj.emails : [];
    this._customfields = obj && obj.customfields ? obj.customfields : [];
    this._datetime_created = obj && obj.datetime_created ? new Date(obj.datetime_created) : null;
    this._datetime_updated = obj && obj.datetime_updated ? new Date(obj.datetime_updated) : null;
  }

  public static getClientArray(array: any): ClientModel[] {

    let clientArray: ClientModel[] = [];

    for(let item of array) {
      clientArray.push(new ClientModel(item))
    }

    return clientArray;
  }

  get id(): number {
    return this._id;
  }

  get region_id(): number {
    return this._region_id;
  }

  get company(): CompanyField {
    return this._company;
  }

  get employee(): EmployeeField {
    return this._employee;
  }

  get parent(): ParentField {
    return this._parent;
  }

  get type(): string {
    return this._type;
  }

  get title(): string {
    return this._title;
  }

  get street(): string {
    return this._street;
  }

  get postcode(): string {
    return this._postcode
  }

  get requisite(): string {
    return this._requisite;
  }

  get fizlico_type(): string {
    return this._fizlico_type;
  }

  get yurlico_type(): string {
    return this._yurlico_type;
  }

  get yurlico_form(): string {
    return this._yurlico_form;
  }

  get phones(): PhoneArrayField {
    return this._phones;
  }

  get emails(): EmailArrayField {
    return this._emails;
  }

  get customfields(): CustomFieldsArrayField {
    return this._customfields;
  }

  get datetime_created(): Date {
    return this._datetime_created;
  }

  get datetime_updated(): Date {
    return this._datetime_updated;
  }

  get datetime_created_format(): string {
    return this._datetime_created.toLocaleString("ru", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  get isParent(): boolean {
    return !this._parent.id ? true : false;
  }

  get isNewClient(): boolean {
    return (new Date() - this.datetime_created > 900000) ? false : true;
  }
}
