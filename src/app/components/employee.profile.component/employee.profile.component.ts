import {Component, OnInit, ViewChild} from '@angular/core';
import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import {UserRepository} from '../../repositories/user.repository';
import {UserModel} from '../../models/user.model';
import {ModalStandardComponent} from '../modal.standard/modal.standard.component';
import {unescape} from 'querystring';
import {UserService} from '../../services/user.service';
import {NotificationService} from '../../services/notification.service';

@Component({
  moduleId: module.id,
  templateUrl: './employee.profile.component.html',
  selector: 'app-employee-profile'
})

export class EmployeeProfileComponent implements OnInit {

  @ViewChild('uploadAvatarModal') private uploadAvatarModal: ModalStandardComponent;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  @ViewChild('changePasswordModal') private changePasswordModal: ModalStandardComponent;

  public data: any;
  public cropperSettings: CropperSettings;

  public changedPassword: string = '';
  public changedRepeatPassword: string = '';

  private avatar: File;

  constructor (private _userRepository: UserRepository,
               private _userService: UserService,
               private _notificationService: NotificationService) {}

  ngOnInit() {
    this.initCropSettings();
  }

  get user(): UserModel {
    return this._userRepository.getMyUser();
  }

  private initCropSettings(): void {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 690;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.rounded = true;
    this.cropperSettings.noFileInput = true;
    this.data = {};
  }

  public showUploadModal(): void{
    this.uploadAvatarModal.showModal();
  }

  public fileChangeListener(event: any): void {
      var image:any = new Image();
      this.avatar = event.target.files[0];
      var myReader:FileReader = new FileReader();
      var that = this;
      myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);

      };

      myReader.readAsDataURL( this.avatar)

  }

  public updateImage(){
    var blob = this.dataURItoBlob(this.data.image);

    let formdata = new FormData();

    formdata.append("avatar", blob, this.avatar.name);

    this._userService.updateUser(this.user.id, formdata).subscribe(
      data => {
        this._userRepository.user = new UserModel(data);
        this.uploadAvatarModal.hideModal();
      },
      err => console.log(err)
    );
  }

  public dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  public openChangePasswordModal(): void {
    this.changePasswordModal.showModal();
  }

  public correctRepeatPassword(): boolean {
    return !(this.changedPassword == this.changedRepeatPassword) ||
      this.changedPassword == '' ||
      this.changedRepeatPassword == '' ||
      this.changedPassword.length < 10 ||
      this.changedRepeatPassword.length < 10;
  }

  public changePassword(event: Event): void {
    event.preventDefault();

    this._userService.updateUser(this.user.id, {
      user: {
        password: this.changedPassword
      }
    }).subscribe(
      data => {
        this.changedPassword = '';
        this.changedRepeatPassword = '';
        this._notificationService.sendNotification({
          title: 'Поздравляем!',
          options: {
            body: 'Вы успешно поменяли пароль'
          }
        });
        this.changePasswordModal.hideModal();
      },
      err => console.log(err)
    )
  }
}
