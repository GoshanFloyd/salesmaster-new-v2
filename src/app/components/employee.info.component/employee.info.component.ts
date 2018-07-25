import {Component, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {EMPLOYEE_TYPES} from '../../variables/variables';

export interface IEmployeeInfo {
  id: number;
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  };
  type: string;
  avatar: string;
  activities_count: number;
  clients_count: number;
  deals_count: number;
  tasks_count: [
    {
      owner_count__in_progress: number;
      owner_count__verifying: number;
      owner_count__failed: number
      owner_count__completed: number;
    },
    {
      doer_count__in_progress: number;
      doer_count__verifying: number;
      doer_count__failed: number;
      doer_count__completed: number;
    }
  ];
}

@Component({
  moduleId: module.id,
  templateUrl: './employee.info.component.html',
  styleUrls: [
    './employee.info.component.css'
  ],
  selector: 'app-employee-info'
})

export class EmployeeInfoComponent {

  @ViewChild('employeeInfoModal') private employeeInfoModal: ModalStandardComponent;

  private _employeeID: number;

  public employeesTypes = EMPLOYEE_TYPES;

  public employeeInfo: IEmployeeInfo;

  constructor (private _userService: UserService) {
    this.employeeInfo = null;
  }

  public getEmployeeInfo(id: number) {
    this._employeeID = id;
    this._userService.getUserInfo(this._employeeID).subscribe(
      data => {
        this.employeeInfo = data[0];
        this.employeeInfoModal.showModal();
      },
      err => console.log(err)
    );
  }
}
