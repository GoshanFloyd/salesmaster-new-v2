
export class ClientLightModel {

  private _id: number;
  private _title: string;
  private _datetime_created: Date;
  private _activities_count: number;
  private _deals_count: number;
  private _is_has_all_deals_by_user: boolean;
  private _is_has_completed_deals_by_user: boolean;


  constructor (id: number, title: string,
               datetime_created: any,
               activities_count?: number,
               deals_count?: number,
               is_has_all_deals_by_user?: boolean,
               is_has_completed_deals_by_user?: boolean) {
    this._id = id ? id : null;
    this._title = title ? title : 'Empty client';
    this._datetime_created = datetime_created ? new Date(datetime_created) : null;
    this._activities_count = activities_count ? activities_count : 0;
    this._deals_count = deals_count ? deals_count : 0;
    this._is_has_all_deals_by_user = is_has_all_deals_by_user;
    this._is_has_completed_deals_by_user = is_has_completed_deals_by_user;
  }

  public static getClientArray(array: any): ClientLightModel[] {

    let clientArray: ClientLightModel[] = [];

    for (let item of array) {
      clientArray.push(new ClientLightModel(
        item.id, item.title,
        item.datetime_created,
        item.activities_count,
        item.deals_count,
        item.is_has_all_deals_by_user,
        item.is_has_completed_deals_by_user
      ));
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

  get isNewClient(): boolean {
    return !(Date.now() - this.datetime_created.getTime() > 900000);
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

  get datetime_created_string(): string {
    return new Date(this._datetime_created).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  get TooltiptText(): string {
    return `Количество активностей: ${this.activities_count} 
            Количество проектов: ${this.deals_count}
            Присутствуют ли ваши проекты: ${this.is_has_all_deals_by_user ? 'Да' : 'Нет'}
            Присутствуют ли ваши закрытые проекты: ${this.is_has_completed_deals_by_user ? 'Да' : 'Нет'}
    `;
  }
}
