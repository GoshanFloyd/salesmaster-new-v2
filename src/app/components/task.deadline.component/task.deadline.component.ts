import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {TaskService} from '../../services/task.service';
import {DATEPICKER_RU_LOCALE} from '../../variables/variables';
import {TaskModel} from '../../models/task.model';
import {NotificationService} from '../../services/notification.service';

@Component({
  moduleId: module.id,
  templateUrl: './task.deadline.component.html',
  selector: 'app-task-deadline'
})

export class TaskDeadlineComponent {

  public ruLocale = DATEPICKER_RU_LOCALE;
  public dateDeadline;

  @Input() task: TaskModel = null;

  @Output() onUpdateDeadline = new EventEmitter<boolean>();

  @ViewChild('taskDeadlineModal') private taskDeadlineModal: ModalStandardComponent;

  constructor (private _taskService: TaskService,
               private _notificationService: NotificationService) {}

  public showDeadlineModal() {
    this.taskDeadlineModal.showModal();
  }

  private getDeadlineDate(date: string): string {
    const dateObj = new Date(date);

    const pad = (number) => {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    };

    return dateObj.getFullYear() +
      '-' + pad(dateObj.getMonth() + 1) +
      '-' + pad(dateObj.getDate()) +
      'T' + pad(dateObj.getHours()) +
      ':' + pad(dateObj.getMinutes()) +
      ':' + pad(dateObj.getSeconds()) +
      '.' + (dateObj.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
      'Z';
  }

  public updateDeadlineDate() {
    if (this.dateDeadline < this.task.datetime_deadline) {
      this._notificationService.sendNotification({
        title: 'Ошибка',
        options: {
          body: 'Новая дата не должна быть меньше старой даты'
        }
      });
    } else {
      this._taskService.updateTask(this.task.id, {
        'status': 'in_progress',
        'datetime_deadline': this.getDeadlineDate(this.dateDeadline)
      }).subscribe(
        data => {
          this.taskDeadlineModal.hideModal();
          this._notificationService.sendNotification({
            title: 'Задача обновлена'
          });
          this.onUpdateDeadline.emit(true);
        },
        err => console.log(err)
      );
    }
  }
}
