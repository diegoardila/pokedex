import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { IsNoAuthGuard } from './guards/is-no-auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [IsNoAuthGuard]  },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(response => response.DashboardModule) },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/' }  
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }