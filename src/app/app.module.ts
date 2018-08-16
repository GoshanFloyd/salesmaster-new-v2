import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { WaitComponent } from './components/wait.component/wait.component';
import {TokenGuard} from './guards/token.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
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
import {AuthenticationProvider} from './providers/authentication.provider';
import {DragulaModule} from 'ng2-dragula';
import {ProductListComponent} from './components/product-list.component/product-list.component';
import {ProductsSearchPipe} from './pipes/products-search.pipe';
import {TasksPageComponent} from './components/tasks.page/tasks.page.component';
import {TasksMainComponent} from './components/tasks.main.component/tasks.main.component';
import {AnalyticPageComponent} from './components/analytic.page/analytic.page.component';
import {AnalyticMainComponent} from './components/analytic.main.component/analytic.main.component';
import {AnalyticListActivityComponent} from './components/analytic.list-activity.component/analytic.list-activity.component';
import {TaskSingleComponent} from './components/task.single.component/task.single.component';
import {TaskAddComponent} from './components/task.add.component/task.add.component';
import {CalendarModule, InputMaskModule, PasswordModule, ProgressBarModule, ToggleButtonModule, TooltipModule} from 'primeng/primeng';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingComponent} from './components/loading.component/loading.component';
import {TaskTodayComponent} from './components/task.today.component/task.today.component';
import {AnalyticListDealsComponent} from './components/analytic.list-deals.component/analytic.list-deals.component';
import {FileManagerPageComponent} from './components/file-manager.page/file-manager.page.component';
import {FileManagerComponent} from './components/file-manager.component/file-manager.component';
import {DirectorySingleComponent} from './components/directory-single.component/directory-single.component';
import {DirectoryAddComponent} from './components/directory-add.component/directory-add.component';
import {ProductPageComponent} from './components/product.page.component/product.page.component';
import {ProductMainComponent} from './components/product-main.component/product-main.component';
import {ProductSelectComponent} from './components/products-select.component/product-select.component';
import {ProductSingleComponent} from './components/product.single.component/product.single.component';
import {CalltextComponent} from './components/calltext.component/calltext.component';
import {EmployeeProfileComponent} from './components/employee.profile.component/employee.profile.component';
import {ImageCropperModule} from 'ng2-img-cropper';
import {AnalyticsGraphActivityComponent} from './components/analytics.graph-activity.component/analytics.graph-activity.component';
import {ChartsModule} from 'ng2-charts';
import {AnalyticsGraphDealsComponent} from './components/analytics.graph-deals.component/analytics.graph-deals.component';
import {ActivityItemComponent} from './components/activity.item.component/activity.item.component';
import {DealSelectComponent} from './components/deal.select.component/deal.select.component';
import {ReportsPageComponent} from './components/reports.page/reports.page.component';
import {ReportsMainComponent} from './components/reports.main.component/reports.main.component';
import {ReportsClientComponent} from './components/reports.client.component/reports.client.component';
import {ContextMenuModule} from 'primeng/contextmenu';
import {TaskCommentsComponent} from './components/task.comments.component/task.comments.component';
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
import {TableModule} from 'primeng/table';
import {HelpPage} from './components/help.page/help.page';
import {HelpMainComponent} from './components/help.main.component/help.main.component';
import {SiteRequestPage} from './components/site.request.page/site.request.page';
import {SiteRequestComponent} from './components/site.request.component/site.request.component';
import {SiteRequestSingleComponent} from './components/site.request.single.component/site.request.single.component';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {SiteConvertClientComponent} from './components/site.convert-client.component/site.convert-client.component';
import {AdminMessageComponent} from './components/admin.message.component/admin.message.component';
import {ServiceModule} from './modules/service/service.module';

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
    ClientHandbookComponent,
    HelpPage,
    HelpMainComponent,
    SiteRequestPage,
    SiteRequestComponent,
    SiteRequestSingleComponent,
    SiteConvertClientComponent,
    AdminMessageComponent
  ],
  imports: [
    BrowserModule,
    ServiceModule,
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
    NgxJsonViewerModule,
    PasswordModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    TokenGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationProvider, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
