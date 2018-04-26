
type EmployeeType = {
  fullname: string;
  id: number;
};

type ClientType = {
  title: string;
  id: number;
};

export class TaskModel {

  private _id: number;
  private _employee_owner: EmployeeType;
  private _employee_doer: EmployeeType;
  private _client: ClientType;
  private _title: string;
  private _description: string;
  private _comments: string;
  private _result: string;
  private _priority: string;
  private _status: string;
  private _datetime_deadline: Date;
  private _datetime_created: Date;
  private _datetime_updated: Date;

  constructor(obj?: any) {
    this._id = obj && obj.id ? obj.id : null;
    this._employee_owner = obj && obj.employee_owner ? obj.employee_owner : null;
    this._employee_doer = obj && obj.employee_doer ? obj.employee_doer : null;
    this._client = obj && obj.client ? obj.client : null;
    this._title = obj && obj.title ? obj.title : null;
    this._description = obj && obj.description ? obj.description : null;
    this._comments = obj && obj.comments ? obj.comments : null;
    this._result = obj && obj.result ? obj.result : null;
    this._priority = obj && obj.priority ? obj.priority : null;
    this._status = obj && obj.status ? obj.status : null;
    this._datetime_deadline = obj && obj.datetime_deadline ? new Date(obj.datetime_deadline) : null;
    this._datetime_created = obj && obj.datetime_created ? new Date(obj.datetime_created) : null;
    this._datetime_updated = obj && obj.datetime_updated ? new Date(obj.datetime_updated) : null;
  }

  static fromArray(array: any): Array<TaskModel> {
    let newArray: Array<TaskModel> = [];

    for (let item of array) {
      newArray.push(new TaskModel(item));
    }

    return newArray;
  }

  get id(): number {
    return this._id;
  }

  get employee_owner(): EmployeeType {
    return this._employee_owner
  }

  get employee_doer(): EmployeeType {
    return this._employee_doer
  }

  get client(): ClientType {
    return this._client;
  }

  get title(): string {
    return this._title;
  }

  get desription(): string {
    return this._description;
  }

  get comments(): string {
    return this._comments;
  }

  get result(): string {
    return this._result;
  }

  get priority(): string {
    return this._priority;
  }

  get status(): string {
    return this._status;
  }

  get datetime_deadline(): Date {
    return this._datetime_deadline;
  }

  get datetime_created(): Date {
    return this._datetime_created;
  }

  get datetime_updated(): Date {
    return this._datetime_updated;
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

  get datetime_deadline_format(): string {
    return new Date(this._datetime_deadline).toLocaleString("ru", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  }
}
