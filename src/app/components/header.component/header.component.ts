import {Component, ViewChild} from '@angular/core';
import {UserRepository} from '../../repositories/user.repository';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {TaskAddComponent} from '../task.add.component/task.add.component';
import {NotificationService} from '../../services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {

  @ViewChild('modalAddTask') public addTaskModal: ModalStandardComponent;
  @ViewChild('addTaskComponent') public addTask: TaskAddComponent;

  constructor(private _userRepository: UserRepository,
              private _notificationService: NotificationService) {}

  public mainHost: string = 'https://test.salesmaster.me';

  get user() {
    return this._userRepository.getMyUser();
  }

  public showAddTaslModal(event: Event) {
    event.preventDefault();
    this.addTask.init();
    this.addTaskModal.showModal();
  }

  public onCreateTask(event: boolean) {
    if (event) {
      this.addTaskModal.hideModal();
      this._notificationService.sendNotification({
        title: 'Задача добавлена'
      });
    }
  }
}
