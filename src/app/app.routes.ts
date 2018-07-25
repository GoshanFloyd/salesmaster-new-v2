import {CalltextComponent} from './components/calltext.component/calltext.component';
import {ContactsComponent} from './components/contacts.component/contacts.component';
import {DealSingleComponent} from './components/deal-single.component/deal-single.component';
import {EmployeeProfileComponent} from './components/employee.profile.component/employee.profile.component';
import {ReportsPageComponent} from './components/reports.page/reports.page.component';
import {ClientAddComponent} from './components/client-add.component/client-add.component';
import {ClientSingleComponent} from './components/client-single.component/client-single.component';
import {ProductMainComponent} from './components/product-main.component/product-main.component';
import {WaitComponent} from './components/wait.component/wait.component';
import {DirectorySingleComponent} from './components/directory-single.component/directory-single.component';
import {LoginComponent} from './components/login.component/login.component';
import {ContactsPageComponent} from './components/contacts.page/contacts.page';
import {AnalyticsGraphActivityComponent} from './components/analytics.graph-activity.component/analytics.graph-activity.component';
import {AnalyticsGraphDealsComponent} from './components/analytics.graph-deals.component/analytics.graph-deals.component';
import {ClientEditComponent} from './components/client-edit.component/client-edit.component';
import {ProductPageComponent} from './components/product.page.component/product.page.component';
import {TasksMainComponent} from './components/tasks.main.component/tasks.main.component';
import {DealEditComponent} from './components/deal-edit.component/deal-edit.component';
import {AnalyticMainComponent} from './components/analytic.main.component/analytic.main.component';
import {DesktopPageComponent} from './components/desktop.page/desktop.page';
import {AnalyticListDealsComponent} from './components/analytic.list-deals.component/analytic.list-deals.component';
import {FileManagerComponent} from './components/file-manager.component/file-manager.component';
import {TasksPageComponent} from './components/tasks.page/tasks.page.component';
import {DesktopComponent} from './components/desktop.component/desktop.component';
import {AnalyticPageComponent} from './components/analytic.page/analytic.page.component';
import {ReportsMainComponent} from './components/reports.main.component/reports.main.component';
import {FileManagerPageComponent} from './components/file-manager.page/file-manager.page.component';
import {AnalyticListActivityComponent} from './components/analytic.list-activity.component/analytic.list-activity.component';
import {TaskSingleComponent} from './components/task.single.component/task.single.component';
import {TokenGuard} from './guards/token.guard';
import {Routes} from '@angular/router';
import {ClientHandbookComponent} from './components/client.handbook.component/client.handbook.component';
import {HandbookPage} from './components/handbook.page/handbook.page';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: WaitComponent, canActivate: [TokenGuard] },
  { path: 'calltext/:id', component: CalltextComponent, canActivate: [TokenGuard] },
  { path: 'profile', component: EmployeeProfileComponent, canActivate: [TokenGuard] },
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
          { path: 'main/deals', component: AnalyticListDealsComponent },
          { path: 'main/graph-activity', component: AnalyticsGraphActivityComponent },
          { path: 'main/graph-deal', component: AnalyticsGraphDealsComponent },
          { path: '**', redirectTo: 'main' }
        ]
      },
      {
        path: '**', redirectTo: 'main'
      }
    ]
  },
  { path: 'file-manager',
    children: [
      {
        path: '', component: FileManagerPageComponent, canActivate: [TokenGuard],
        children: [
          { path: 'main', component: FileManagerComponent },
          { path: 'main/:company_id', component: FileManagerComponent },
          { path: 'main/directory/:id', component: DirectorySingleComponent },
          { path: '**', redirectTo: 'main' }
        ]
      },
      {
        path: '**', redirectTo: 'main'
      }
    ]
  },
  { path: 'products',
    children: [
      {
        path: '', component: ProductPageComponent, canActivate: [TokenGuard],
        children: [
          { path: 'main', component: ProductMainComponent },
          { path: '**', redirectTo: 'main' }
        ]
      },
      {
        path: '**', redirectTo: 'main'
      }
    ]
  },
  { path: 'reports',
    children: [
      {
        path: '', component: ReportsPageComponent, canActivate: [TokenGuard],
        children: [
          { path: 'main', component: ReportsMainComponent },
          { path: '**', redirectTo: 'main' }
        ]
      },
      {
        path: '**', redirectTo: 'main'
      }
    ]
  },
  {
    path: 'handbook',
    children: [
      {
        path: '', component: HandbookPage, canActivate: [TokenGuard],
        children: [
          { path: 'main', component: ClientHandbookComponent },
          { path: '**', redirectTo: 'main' }
        ]
      },
      {
        path: '**', redirectTo: 'main'
      }
    ]
  },
  { path: '**', redirectTo: '' },

];
