import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ContentComponent } from './components/content/content.component';
import { SidebarComponentDashboard } from './components/general-component/sidebar/sidebar.component';
import { ListComponent } from './components/parts/list/list.component';
import { TeamComponent } from './components/parts/team/team.component';
import { ItemsComponent } from './components/parts/items/items.component';
import { MovesComponent } from './components/parts/moves/moves.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContentComponent,
    ListComponent,
    TeamComponent,
    ItemsComponent,
    MovesComponent,
    SidebarComponentDashboard,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DashboardRoutingModule,   
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ],
})
export class DashboardModule { }
