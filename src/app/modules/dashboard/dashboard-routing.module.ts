import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { IsAuthGuard } from '../../guards/is-auth.guard';

const routes: Routes = [
  { path: '', component: ContentComponent, canActivate: [IsAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }