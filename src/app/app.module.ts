import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { WaitComponent } from './components/wait.component/wait.component';
import {TokenGuard} from './guards/token.guard';
import {AuthService} from './services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UserService} from './services/user.service';
import {UserRepository} from './repositories/user.repository';
import {NotificationService} from './services/notification.service';
import {ClientAddComponent} from './components/client-add.component/client-add.component';
import {ClientEditComponent} from './components/client-edit.component/client-edit.component';
import {DealSingleComponent} from './components/deal-single.component/deal-single.component';
import {ClientSingleComponent} from './components/client-single.component/client-single.component';
import {DealEditComponent} from './components/deal-edit.component/deal-edit.component';
import {ContactsPageComponent} from './components/contacts.page/contacts.page';
import {ContactsComponent} from './components/contacts.component/contacts.component';
import {DesktopPageComponent} from './components/desktop.page/desktop.page';
import {DesktopComponent} from './components/desktop.component/desktop.component';
import {HeaderComponent} from './components/header.component/header.component';
import {NavigationComponent} from './components/navigation.component/navigation.component';
import {ActivityEditComponent} from './components/activity-edit.component/activity-edit.component';
import {DealsKanbanComponent} from './components/deals-kanban.component/deals-kanban.component';
import {ActivityAddComponent} from './components/activity-add.component/activity-add.component';
import {DealAddComponent} from './components/deal-add.component/deal-add.component';
import {ClientsMyPipe} from './pipes/clients-my.pipe';
import {ClientsSearchPipe} from './pipes/clients-search.pipe';
import {ClientSelectComponent} from './components/client.select.component/client.select.component';
import {ClientsListComponent} from './components/clients-list.component/clients-list.component';
import {ModalStandardComponent} from './components/modal.standard/modal.standard.component';
import {ActivityService} from './services/activity.service';
import {AuthenticationProvider} from './providers/authentication.provider';
import {ActivityTypeService} from './services/activitytype.service';
import {ClientsRepository} from './repositories/clients.repository';
import {DealService} from './services/deal.service';
import {ClientsService} from './services/clients.service';
import {DealStageService} from './services/dealstage.service';
import {DragulaModule} from 'ng2-dragula';
import {ProductService} from './services/product.service';
import {ProductListComponent} from './components/product-list.component/product-list.component';
import {ProductsSearchPipe} from './pipes/products-search.pipe';
import {TasksPageComponent} from './components/tasks.page/tasks.page.component';
import {TasksMainComponent} from './components/tasks.main.component/tasks.main.component';
import {TaskService} from './services/task.service';
import {AnalyticPageComponent} from './components/analytic.page/analytic.page.component';
import {AnalyticMainComponent} from './components/analytic.main.component/analytic.main.component';
import {AnalyticListActivityComponent} from './components/analytic.list-activity.component/analytic.list-activity.component';
import {TaskSingleComponent} from './components/task.single.component/task.single.component';
import {TaskAddComponent} from './components/task.add.component/task.add.component';
import {CalendarModule, InputMaskModule, ProgressBarModule, ToggleButtonModule, TooltipModule} from 'primeng/primeng';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CentrifugeService} from './services/centrifuge.service';
import {LoadingComponent} from './components/loading.component/loading.component';
import {LoadingService} from './services/loading.service';
import {TaskTodayComponent} from './components/task.today.component/task.today.component';
import {AnalyticListDealsComponent} from './components/analytic.list-deals.component/analytic.list-deals.component';
import {FileManagerPageComponent} from './components/file-manager.page/file-manager.page.component';
import {FileManagerComponent} from './components/file-manager.component/file-manager.component';
import {DocumentService} from './services/document.service';
import {DirectoryService} from './services/directory.service';
import {DirectorySingleComponent} from './components/directory-single.component/directory-single.component';
import {DirectoryAddComponent} from './components/directory-add.component/directory-add.component';
import {ProductPageComponent} from './components/product.page.component/product.page.component';
import {ProductMainComponent} from './components/product-main.component/product-main.component';
import {ProductSelectComponent} from './components/products-select.component/product-select.component';
import {ProductBrandService} from './services/product.brand.service';
import {ProductSingleComponent} from './components/product.single.component/product.single.component';
import {CalltextComponent} from './components/calltext.component/calltext.component';
import {EmployeeProfileComponent} from './components/employee.profile.component/employee.profile.component';
import {ImageCropperModule} from 'ng2-img-cropper';
import {AnalyticsGraphActivityComponent} from './components/analytics.graph-activity.component/analytics.graph-activity.component';
import {ChartsModule} from 'ng2-charts';
import {AnalyticService} from './services/analytic.service';
import {AnalyticsGraphDealsComponent} from './components/analytics.graph-deals.component/analytics.graph-deals.component';
import {ActivityItemComponent} from './components/activity.item.component/activity.item.component';
import {DealSelectComponent} from './components/deal.select.component/deal.select.component';
import {ReportsPageComponent} from './components/reports.page/reports.page.component';
import {ReportsMainComponent} from './components/reports.main.component/reports.main.component';
import {ReportService} from './services/report.service';
import {ReportsClientComponent} from './components/reports.client.component/reports.client.component';
import {SoundService} from './services/sound.service';
import {ContextMenuModule} from 'primeng/contextmenu';
import {TaskCommentsComponent} from './components/task.comments.component/task.comments.component';
import {OfflineService} from './services/offline.service';
import {appRoutes} from './app.routes';
import {CommentComponent} from './components/comment.component/comment.component';
import {ClientsDatePipe} from './pipes/clients-date.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {EmployeeInfoComponent} from './components/employee.info.component/employee.info.component';
import {TaskDeadlineComponent} from './components/task.deadline.component/task.deadline.component';
import {ProductAddComponent} from './components/product.add.component/product.add.component';
import {ClientHandbookComponent} from './components/client.handbook.component/client.handbook.component';
import {HandbookPage} from './components/handbook.page/handbook.page';
import {NgClass} from '@angular/common';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WaitComponent,
    DesktopPageComponent,
    DesktopComponent,
    HeaderComponent,
    NavigationComponent,
    ContactsPageComponent,
    ContactsComponent,
    DealsKanbanComponent,
    DealAddComponent,
    ActivityAddComponent,
    DealSingleComponent,
    ActivityEditComponent,
    DealEditComponent,
    ClientEditComponent,
    ClientsListComponent,
    ClientAddComponent,
    ClientSingleComponent,
    ClientsSearchPipe,
    ClientsMyPipe,
    ProductsSearchPipe,
    ClientSelectComponent,
    ModalStandardComponent,
    ProductListComponent,
    TasksPageComponent,
    TasksMainComponent,
    AnalyticPageComponent,
    AnalyticMainComponent,
    AnalyticListActivityComponent,
    TaskSingleComponent,
    TaskAddComponent,
    LoadingComponent,
    TaskTodayComponent,
    AnalyticListDealsComponent,
    FileManagerPageComponent,
    FileManagerComponent,
    DirectorySingleComponent,
    DirectoryAddComponent,
    ProductPageComponent,
    ProductMainComponent,
    ProductSelectComponent,
    ProductSingleComponent,
    CalltextComponent,
    EmployeeProfileComponent,
    AnalyticsGraphActivityComponent,
    AnalyticsGraphDealsComponent,
    ActivityItemComponent,
    DealSelectComponent,
    ReportsPageComponent,
    ReportsMainComponent,
    ReportsClientComponent,
    TaskCommentsComponent,
    CommentComponent,
    ClientsDatePipe,
    EmployeeInfoComponent,
    TaskDeadlineComponent,
    ProductAddComponent,
    HandbookPage,
    ClientHandbookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DragulaModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    CalendarModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ToggleButtonModule,
    ChartsModule,
    ContextMenuModule,
    InputMaskModule,
    TooltipModule,
    ProgressBarModule,
    TableModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    TokenGuard,
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationProvider, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
