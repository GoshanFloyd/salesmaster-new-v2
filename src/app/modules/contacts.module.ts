import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TokenGuard} from '../guards/token.guard';
import { ContactsComponent} from '../components/contacts.component/contacts.component';
import {ClientsRepository} from '../repositories/clients.repository';
import {ClientsService} from '../services/clients.service';
import {ClientsListComponent} from '../components/clients-list.component/clients-list.component';
import {ClientSingleComponent} from '../components/client-single.component/client-single.component';
import {ContactsPageComponent} from '../components/contacts.page/contacts.page';
import {HeaderComponent} from '../components/header.component/header.component';
import {NavigationComponent} from '../components/navigation.component/navigation.component';
import {DealsKanbanComponent} from '../components/deals-kanban.component/deals-kanban.component';
import {ClientAddComponent} from '../components/client-add.component/client-add.component';
import {ClientSelectComponent} from '../components/client.select.component/client.select.component';
import {ModalStandardComponent} from '../components/modal.standard/modal.standard.component';
import {DragulaModule} from 'ng2-dragula';
import {DealService} from '../services/deal.service';
import {DealStageService} from '../services/dealstage.service';
import {AuthenticationProvider} from '../providers/authentication.provider';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NotificationService} from '../services/notification.service';
import {DealAddComponent} from '../components/deal-add.component/deal-add.component';
import {ActivityService} from '../services/activity.service';
import {ActivityAddComponent} from '../components/activity-add.component/activity-add.component';
import {ActivityTypeService} from '../services/activitytype.service';
import {DealSingleComponent} from '../components/deal-single.component/deal-single.component';
import {ClientsSearchPipe} from '../pipes/clients-search.pipe';
import {ClientsMyPipe} from '../pipes/clients-my.pipe';

const routes: Routes = [
  {
    path: '', component: ContactsPageComponent, canActivate: [TokenGuard],
    children: [
      { path: 'main', component: ContactsComponent },
      { path: 'main/add', component: ClientAddComponent },
      { path: 'main/:id', component: ClientSingleComponent },
      { path: 'main/:id/deal/:deal_id', component: DealSingleComponent },
      { path: '**', redirectTo: 'main' }
    ]
  },
  {
    path: '**', redirectTo: 'main'
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule.forChild(routes), DragulaModule],
  providers:
    [
      TokenGuard,
      ClientsRepository,
      ClientsService,
      ClientsRepository,
      DealService,
      DealStageService,
      NotificationService,
      ActivityService,
      ActivityTypeService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthenticationProvider, multi: true },
    ],
  declarations:
    [
      ContactsPageComponent,
      ContactsComponent,
      ClientsListComponent,
      ClientSingleComponent,
      HeaderComponent,
      NavigationComponent,
      DealsKanbanComponent,
      ClientAddComponent,
      ClientSelectComponent,
      ModalStandardComponent,
      DealAddComponent,
      ActivityAddComponent,
      DealSingleComponent,
      ClientsSearchPipe,
      ClientsMyPipe
    ]
})

export class ContactsModule { }

