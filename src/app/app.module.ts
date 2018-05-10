import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { WaitComponent } from './components/wait.component/wait.component';
import {TokenGuard} from './guards/token.guard';
import {AuthService} from './services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
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
import {CalendarModule, ToggleButtonModule} from 'primeng/primeng';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ChartModule} from 'primeng/chart';
import {CentrifugeService} from './services/centrifuge.service';
import {LoadingComponent} from './components/loading.component/loading.component';
import {LoadingService} from './services/loading.service';
import {TaskTodayComponent} from './components/task.today.component/task.today.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: WaitComponent, canActivate: [TokenGuard] },
  { path: 'contacts', children: [
    {
      path: '', component: ContactsPageComponent, canActivate: [TokenGuard],
      children: [
        { path: 'main', component: ContactsComponent },
        { path: 'main/add', component: ClientAddComponent },
        { path: 'main/:id', component: ClientSingleComponent },
        { path: 'main/:id/edit', component: ClientEditComponent },
        { path: 'main/:id/deal/:deal_id', component: DealSingleComponent },
        { path: 'main/deal/:deal_id/edit', component: DealEditComponent },
        { path: '**', redirectTo: 'main'}
      ]
    }
    ]
  },
  { path: 'desktop',
    children: [
      {
        path: '', component: DesktopPageComponent, canActivate: [TokenGuard],
        children: [
          { path: 'main', component: DesktopComponent },
          { path: '**', redirectTo: 'main' }
        ]
      },
      {
        path: '**', redirectTo: 'main'
      }
    ]
  },
  { path: 'tasks',
    children: [
      {
        path: '', component: TasksPageComponent, canActivate: [TokenGuard],
        children: [
          { path: 'main', component: TasksMainComponent },
          { path: 'main/:id', component: TaskSingleComponent },
          { path: '**', redirectTo: 'main' }
        ]
      },
      {
        path: '**', redirectTo: 'main'
      }
    ]
  },
  { path: 'analytics',
    children: [
      {
        path: '', component: AnalyticPageComponent, canActivate: [TokenGuard],
        children: [
          { path: 'main', component: AnalyticMainComponent },
          { path: 'main/activity', component: AnalyticListActivityComponent },
          { path: '**', redirectTo: 'main' }
        ]
      },
      {
        path: '**', redirectTo: 'main'
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

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
    TaskTodayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DragulaModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    CalendarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ChartModule,
    ToggleButtonModule
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
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationProvider, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
