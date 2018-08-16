import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {UserRepository} from '../../repositories/user.repository';
import {NotificationService} from '../../services/notification.service';
import {ClientsRepository} from '../../repositories/clients.repository';
import {ClientsService} from '../../services/clients.service';
import {DealService} from '../../services/deal.service';
import {DealStageService} from '../../services/dealstage.service';
import {ActivityService} from '../../services/activity.service';
import {ActivityTypeService} from '../../services/activitytype.service';
import {ProductService} from '../../services/product.service';
import {TaskService} from '../../services/task.service';
import {CentrifugeService} from '../../services/centrifuge.service';
import {LoadingService} from '../../services/loading.service';
import {DocumentService} from '../../services/document.service';
import {DirectoryService} from '../../services/directory.service';
import {ProductBrandService} from '../../services/product.brand.service';
import {AnalyticService} from '../../services/analytic.service';
import {ReportService} from '../../services/report.service';
import {SoundService} from '../../services/sound.service';
import {OfflineService} from '../../services/offline.service';
import {ColdClientService} from '../../services/cold.client.service';
import {TaskRepository} from '../../repositories/task.repository';
import {AdminMessageService} from '../../services/admin.message.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    NotificationService,
    ClientsRepository,
    ClientsService,
    ClientsRepository,
    DealService,
    DealStageService,
    NotificationService,
    ActivityService,
    ActivityTypeService,
    ProductService,
    TaskService,
    CentrifugeService,
    LoadingService,
    DocumentService,
    DirectoryService,
    ProductBrandService,
    AnalyticService,
    ReportService,
    SoundService,
    OfflineService,
    ColdClientService,
    TaskRepository,
    AdminMessageService
  ]
})
export class ServiceModule { }
