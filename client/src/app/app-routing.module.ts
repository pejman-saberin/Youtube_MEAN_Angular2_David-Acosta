import { RouterModule, Routes } from '@angular/router';  //pasted directly from https://angular.io/guide/router
import { NgModule } from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import{RegisterComponent} from './components/register/register.component';
import{LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/notAuth.guard';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],  //user should be logged in to access the dashboard
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard],  //user should NOT be logged in to access the register
    pathMatch: 'full'
  },

   {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard],  //user should NOT be logged in to access the login
    pathMatch: 'full'
  },

  {
   path: 'profile',
   component: ProfileComponent,
   canActivate: [AuthGuard],
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
