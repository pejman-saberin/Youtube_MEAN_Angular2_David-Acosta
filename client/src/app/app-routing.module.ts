import { RouterModule, Routes } from '@angular/router';  //pasted directly from https://angular.io/guide/router
import { NgModule } from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import{RegisterComponent} from './components/register/register.component';
import{LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/notAuth.guard';
import {BlogComponent} from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';



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

 {
  path: 'blog',
  component: BlogComponent,
  canActivate: [AuthGuard],
  pathMatch: 'full'
},
{
 path: 'edit-blog/:id',
 component: EditBlogComponent,
 canActivate: [AuthGuard],
 pathMatch: 'full'
},
{
 path: 'delete-blog/:id',
 component: DeleteBlogComponent,
 canActivate: [AuthGuard],
 pathMatch: 'full'
},
{
 path: 'user/:username',
 component: PublicProfileComponent,
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
