import { RouterModule, Routes } from '@angular/router';  //pasted directly from https://angular.io/guide/router
import { NgModule } from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import{RegisterComponent} from './components/register/register.component';
import{LoginComponent} from './components/login/login.component'

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  
   {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },

  //{ path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: HomeComponent,pathMatch: 'full' }  //any other route redirect to homepage
];

@NgModule({
  declarations: [ ],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports:[RouterModule]
})

export class AppRoutingModule { }
