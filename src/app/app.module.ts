import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component/login.component';
import { HttpClientModule } from '@angular/common/http';
import { WaitComponent } from './components/wait.component/wait.component';
import {TokenGuard} from './guards/token.guard';
import {AuthService} from './services/auth.service';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {ContactsModule} from './modules/contacts.module';
import {UserService} from './services/user.service';
import {UserRepository} from './repositories/user.repository';
import {ClientsRepository} from './repositories/clients.repository';
import {ClientsService} from './services/clients.service';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: WaitComponent, canActivate: [TokenGuard] },
  { path: 'contacts', loadChildren: () => ContactsModule},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WaitComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    TokenGuard,
    AuthService,
    UserService,
    UserRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
