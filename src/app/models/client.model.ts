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

type TPhone = {
  id: number;
  owner_name: string;
  type: string;
  number: string;
};

type TEmail = {
  id: number;
  owner_name: string;
  type: string;
  address: string;
};

type TCustomField = {
  id: number;
  key: string;
  value: string;
};

type PhoneArrayField = Array<TPhone>;

type EmailArrayField = Array<TEmail>;

type CustomFieldsArrayField = Array<TCustomField>;

export interface IClientHandbook {
  id: number;
  title: string;
  phones: PhoneArrayField;
  emails: EmailArrayField;
  customfields: CustomFieldsArrayField;
}

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
  private _activities_count: number;
  private _deals_count: number;
  private _is_has_all_deals_by_user: boolean;
  private _is_has_completed_deals_by_user: boolean;

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
    this._activities_count = obj && obj.activities_count ? obj.activities_count : 0;
    this._deals_count = obj && obj.deals_count ? obj.deals_count : 0;
    this._is_has_all_deals_by_user = obj && 'is_has_all_deals_by_user' in obj ? obj.is_has_all_deals_by_user : null;
    this._is_has_completed_deals_by_user = obj && 'is_has_completed_deals_by_user' in obj ? obj.is_has_completed_deals_by_user : null;
  }

  public static getClientArray(array: any): ClientModel[] {

    let clientArray: ClientModel[] = [];

    for(const item of array) {
      clientArray.push(new ClientModel(item));
    }

    return clientArray;
  }

  public static getTypeMail(type: string): string {
    if (type === 'corporate') {
      return 'Корпоративная почта';
    }
    if (type === 'personal') {
      return 'Персональная почта';
    }
  }

  public static getTypePhone(type: string): string {
    if (type === 'job') {
      return 'Рабочий телефон';
    }
    if (type === 'private') {
      return 'Личный телефон';
    }
    if (type === 'home') {
      return 'Домашний телефон';
    }
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
    return this._postcode;
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
    return new Date(this._datetime_created).toLocaleString('ru', {
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
    return Date.now() - this.datetime_created.getTime() > 900000 ? false : true;
  }

  get activities_count(): number {
    return this._activities_count;
  }

  get deals_count(): number {
    return this._deals_count;
  }

  get is_has_all_deals_by_user(): boolean {
    return this._is_has_all_deals_by_user;
  }

  get is_has_completed_deals_by_user(): boolean {
    return this._is_has_completed_deals_by_user;
  }

  public checkEditPhones(phone: TPhone): any {
    return this.phones.filter((p) => {
      return p.id == phone.id && p.number != phone.number && p.type != phone.type
    });
  }
}
