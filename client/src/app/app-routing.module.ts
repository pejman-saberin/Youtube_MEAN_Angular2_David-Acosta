import { RouterModule, Routes } from '@angular/router';  //pasted directly from https://angular.io/guide/router
import { NgModule } from '@angular/core';
import {HomeComponent} from './components/home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent   
  },

  //{ path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [ ],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports:[RouterModule]
})

export class AppRoutingModule { }
