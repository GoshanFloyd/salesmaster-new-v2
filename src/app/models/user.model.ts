import {s} from '@angular/core/src/render3';

type TypeUserInfo = {
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string
};

type GroupItem = {
  id: number,
  title: string
}

type TypeGroupArray = Array<GroupItem>;

export class UserModel {
  private readonly _id: number;
  private _user: TypeUserInfo;
  private readonly _type: string;
  private _avatar: string;
  private readonly _company: TypeGroupArray;
  private _gender: string;

  constructor(obj?: any) {
    this._id = obj && obj.id ? obj.id : null;
    this._user = obj && obj.user ? obj.user : {
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      password: null
    };
    this._type = obj && obj.type ? obj.type : null;
    this._avatar = obj && obj.avatar ? obj.avatar : null;
    this._company = obj && obj.company ? obj.company : null;
    this._gender = obj && obj.gender ? obj.gender : null;
  }

  get id(): number {
    return this._id;
  }

  get user(): TypeUserInfo {
    return this._user;
  }

  get type(): string {
    return this._type;
  }

  get avatar(): string {
    return this._avatar;
  }

  get company(): TypeGroupArray {
    return this._company
  }

  get gender(): string {
    return this._gender;
  }

  get genderString(): string {
    if (this._gender == 'bot') {
      return 'Системный пользоваель';
    }
    if (this._gender == 'male') {
      return 'Мужской';
    }
    if (this._gender == 'female') {
      return 'Женский';
    }
  }

  public getDefaultCompany(): GroupItem {
    return this.company[0];
  }

  static parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  static fromArray(array: any): Array<UserModel> {
    let newArray: Array<UserModel> = [];

    for (let item of array) {
      newArray.push(new UserModel(item))
    }

    return newArray;
  }
}

